package link.sudy.orokseg.serviices;

import java.util.Optional;
import java.util.stream.StreamSupport;
import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.repository.FamilyRepository;
import link.sudy.orokseg.serviices.converters.FamilyConverter;
import lombok.val;
import org.springframework.stereotype.Service;

@Service
public class FamilyService {
    
    private final FamilyRepository familyRepository;
    private final FamilyConverter familyConverter;

    public FamilyService(final FamilyRepository familyRepository, final FamilyConverter familyConverter) {
        this.familyRepository = familyRepository;
        this.familyConverter = familyConverter;
    }


    public Iterable<Family> getFamilies() {
        val families = this.familyRepository.findAll();
        return StreamSupport.stream(families.spliterator(), false)
                .map((dbFamily) -> {
                    return this.familyConverter.toAPIFamily(dbFamily);
                })
                .collect(java.util.stream.Collectors.toList());
    }
    


    public Optional<Family> getFamilyById(String id) {
        return this.familyRepository.findByGrampsId(id)
                .map((dbFamily) -> this.familyConverter.toAPIFamily(dbFamily));
    }
    
    public Optional<Family> getFamilyByHandle(String handle) {
        return this.familyRepository
        .findById(handle)
                .map((family) -> this.familyConverter.toAPIFamily(family));
    }
}
