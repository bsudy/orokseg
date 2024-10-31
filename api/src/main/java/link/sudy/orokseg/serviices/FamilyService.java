package link.sudy.orokseg.serviices;

import java.util.Optional;
import java.util.List;
import java.util.Collections;
import java.util.Map;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import java.util.stream.IntStream;
import java.util.stream.StreamSupport;
import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.model.FamilyTree;
import link.sudy.orokseg.model.FamilyTree.ChildWithFamilies;
import link.sudy.orokseg.repository.FamilyRepository;
import link.sudy.orokseg.serviices.converters.FamilyConverter;
import lombok.val;

import org.python.antlr.op.In;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FamilyService {

  private final FamilyRepository familyRepository;
  private final FamilyConverter familyConverter;
  private final PersonService personService;

  public FamilyService(
      final FamilyRepository familyRepository, final FamilyConverter familyConverter, final PersonService personService) {
    this.familyRepository = familyRepository;
    this.familyConverter = familyConverter;
    this.personService = personService;
  }

  public Iterable<Family> getFamilies(final int page, final int pageSize) {
    val families = this.familyRepository.findAll(Pageable.ofSize(pageSize).withPage(page));
    return StreamSupport.stream(families.spliterator(), false)
        .map(
            (dbFamily) -> {
              return this.familyConverter.toAPIFamily(dbFamily);
            })
        .collect(java.util.stream.Collectors.toList());
  }

  public Optional<Family> getFamilyById(String id) {
    return this.familyRepository
        .findByGrampsId(id)
        .map((dbFamily) -> this.familyConverter.toAPIFamily(dbFamily));
  }

  public Optional<Family> getFamilyByHandle(String handle) {
    return this.familyRepository
        .findById(handle)
        .map((family) -> this.familyConverter.toAPIFamily(family));
  }


  private Optional<FamilyTree.FamilyWithMembers> getFamilyWithMember(String handle) {
    return Optional.ofNullable(handle)
        .flatMap((familyHandle) -> this.familyRepository.findById(familyHandle))
        .map((dbFamily) -> this.familyConverter.toAPIFamily(dbFamily))
        .map((family) -> {
          var father = Optional.ofNullable(family.getFatherHandle())
              .flatMap((fatherHandle) -> this.personService.getByHandle(fatherHandle));
          var mother = Optional.ofNullable(family.getMotherHandle())
              .flatMap((motherHandle) -> this.personService.getByHandle(motherHandle));
          return new FamilyTree.FamilyWithMembers(family, father.orElse(null), mother.orElse(null));
        });
  }

  private List<FamilyTree.FamilyWithMembers> goUp(List<? extends Family> families) {
    return families.stream().flatMap((family) -> {
      if (family == null) {
        return Stream.<FamilyTree.FamilyWithMembers>of(null, null);
      }
      var fatherFamily = Optional.ofNullable(family.getFatherHandle())
          .flatMap((handle) -> this.personService.getByHandle(handle))
          .flatMap((father) -> father.getParentFamilyRefList().stream().findFirst())
          .flatMap((parentFamilyRef) -> this.getFamilyWithMember(parentFamilyRef));
      
      var motherFamily = Optional.ofNullable(family.getMotherHandle())
          .flatMap((handle) -> this.personService.getByHandle(handle))
          .flatMap((father) -> father.getParentFamilyRefList().stream().findFirst())
          .flatMap((parentFamilyRef) -> this.getFamilyWithMember(parentFamilyRef));
      return Stream.of(fatherFamily.orElse(null), motherFamily.orElse(null));
    }).collect(Collectors.toList());

  }

  private Map<Integer, List<FamilyTree.FamilyWithMembers>> goUp(FamilyTree.FamilyWithMembers family, int up) {
    if (up == 0) {
      return Collections.emptyMap();
    }

    Map<Integer, List<FamilyTree.FamilyWithMembers>> upMap = Map.of();
    List<FamilyTree.FamilyWithMembers> familyList = List.of(family);
    for (int i = 1; i <= up; i++) {
      familyList = this.goUp(familyList);
      upMap.put(i, familyList);
    }

    return upMap;
  }

  private List<ChildWithFamilies> goDown(Family family, int down) {
    if (family == null) {
      return List.<ChildWithFamilies>of();
    }

    return family.getChildren().stream().map((childHandle) -> this.personService.getByHandle(childHandle.getHandle()))
    .filter((child) -> child.isPresent())
    .map((child) -> child.get())
    .map((child) -> {
          var childFamilies = child.getFamilyRefList().stream().map((familyRef) -> this.familyRepository.findById(familyRef))
              .filter((dbFamily) -> dbFamily.isPresent())
              .map(dbFamily -> dbFamily.get())
              .map(dbFamily -> this.familyConverter.toAPIFamily(dbFamily))
              .map(f -> {
                var partnerHandle = f.getFatherHandle() == child.getHandle() ? f.getMotherHandle()
                    : f.getFatherHandle();
                var partner = this.personService.getByHandle(partnerHandle);
                var children = this.goDown(f, down - 1);
                return new FamilyTree.ChildWithFamilies.ChildFamily(partner.orElse(null), children);
              }).collect(Collectors.toList());
          return new FamilyTree.ChildWithFamilies(child, childFamilies);
    }).collect(Collectors.toList());
  }

  public Optional<FamilyTree> getFamilyTree(String id, int up, int down) {
    return this.familyRepository
        .findByGrampsId(id)
        .flatMap((dbFamily) -> this.getFamilyWithMember(dbFamily.getHandle()))
        .map((family) -> new FamilyTree(family, this.goUp(family, up), this.goDown(family, down)));
  }
}
