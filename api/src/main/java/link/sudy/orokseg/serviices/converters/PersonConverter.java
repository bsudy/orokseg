package link.sudy.orokseg.serviices.converters;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.Attribute;
import link.sudy.orokseg.model.Attribute.AttributeType;
import link.sudy.orokseg.model.Gender;
import link.sudy.orokseg.model.Name;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.model.PersonRef;
import link.sudy.orokseg.model.Surname;
import link.sudy.orokseg.repository.model.DBPerson;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PersonConverter {

  private static final Logger logger = LoggerFactory.getLogger(PersonConverter.class);

  public static Person toPerson(DBPerson dbPerson) {
    // return (
    //     self.handle,  #  0
    //     self.gramps_id,  #  1
    //     self.__gender,  #  2
    //     self.primary_name.serialize(),  #  3
    //     [name.serialize() for name in self.alternate_names],  #  4
    //     self.death_ref_index,  #  5
    //     self.birth_ref_index,  #  6
    //     EventBase.serialize(self),  #  7
    //     self.family_list,  #  8
    //     self.parent_family_list,  #  9
    //     MediaBase.serialize(self),  # 10
    //     AddressBase.serialize(self),  # 11
    //     AttributeBase.serialize(self),  # 12
    //     UrlBase.serialize(self),  # 13
    //     LdsOrdBase.serialize(self),  # 14
    //     CitationBase.serialize(self),  # 15
    //     NoteBase.serialize(self),  # 16
    //     self.change,  # 17
    //     TagBase.serialize(self),  # 18
    //     self.private,  # 19
    //     [pr.serialize() for pr in self.person_ref_list],  # 20
    // )

    val obj = PickleUtils.unpickle(dbPerson.getBlobData());
    // logger.info("Converting person object: {}", obj);
    val parts = (Object[]) obj;

    // logger.info(
    //     "Person: {}, Blog (b6): {}",
    //     dbPerson.getGrampsId(),
    //     Base64.getEncoder().encodeToString(dbPerson.getBlobData())
    // );
    val handle = (String) parts[0];
    val grampsId = (String) parts[1];
    final Gender gender;
    if ((Integer) parts[2] == 0) {
      gender = Gender.FEMALE;
    } else if ((Integer) parts[2] == 1) {
      gender = Gender.MALE;
    } else {
      gender = Gender.UNKNOWN;
    }
    val primaryName = toName(parts[3]);

    val alternateNames =
        toList(parts[4]).stream().map(PersonConverter::toName).collect(Collectors.toList());
    // var deathRefIndex = (Integer) parts[5];
    // var birthRefIndex = (Integer) parts[6];
    // // var eventRefs = toStringList(parts[7]);
    val familyRefList = ConversionUtils.toStringList(parts[8]);
    val parentFamilyRefList = ConversionUtils.toStringList(parts[9]);
    var mediaRefList =
        toList(parts[10]).stream().map(MediaConverter::toMediaRef).collect(Collectors.toList());

    var attributes =
        toList(parts[12]).stream().map(PersonConverter::toAttribute).collect(Collectors.toList());

    var noteRefList = ConversionUtils.toStringList(parts[16]);

    // var isPrivate = toPrivacyBase(parts[19]);
    // var personRefs = toList(parts[20]).stream().map(this::toPersonRef)
    //         .collect(Collectors.toList());

    // var blob64 = Base64.getEncoder().encodeToString(dbPerson.getBlobData());

    return new Person(
        handle,
        grampsId,
        primaryName,
        gender,
        alternateNames,
        familyRefList,
        parentFamilyRefList,
        noteRefList,
        mediaRefList,
        attributes
        // obj,
        // blob64
        );
  }

  public static Name toName(Object obj) {

    logger.info("Converting name object: {}", obj);

    var parts = (Object[]) obj;
    // return (
    //     PrivacyBase.serialize(self),
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     DateBase.serialize(self),
    //     self.first_name,
    //     SurnameBase.serialize(self),
    //     self.suffix,
    //     self.title,
    //     self.type.serialize(),
    //     self.group_as,
    //     self.sort_as,
    //     self.display_as,
    //     self.call,
    //     self.nick,
    //     self.famnick,

    // )
    return new Name(
        Objects.toString(parts[4]),
        toList(parts[5]).stream().map(PersonConverter::toSurname).collect(Collectors.toList()),
        Objects.toString(parts[6])
        // Title
        // Type
        );
  }

  private static Surname toSurname(Object obj) {
    // return (
    //     self.surname,
    //     self.prefix,
    //     self.primary,
    //     self.origintype,
    //     self.connector,
    // )
    var parts = (Object[]) obj;
    return new Surname(Objects.toString(parts[0]), Objects.toString(parts[1]), (Boolean) parts[2]);
  }

  public static List<Object> toList(Object obj) {
    if (obj == null) {
      return List.of();
    }
    if (obj.getClass().isArray()) {
      return Arrays.asList((Object[]) obj);
    }
    if (obj instanceof List) {
      return (List<Object>) obj;
    }
    throw new RuntimeException("Cannot convert to list: " + obj);
  }

  // public static Object toMediaRef(Object obj) {
  //     // return (
  //     //     PrivacyBase.serialize(self),
  //     //     CitationBase.serialize(self),
  //     //     NoteBase.serialize(self),
  //     //     AttributeBase.serialize(self),
  //     //     RefBase.serialize(self),
  //     //     self.rect,
  //     // )
  // }

  public static Object toPersonRef(Object obj) {
    // return (
    //     PrivacyBase.serialize(self),
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     RefBase.serialize(self),
    //     self.rel,
    // )
    var parts = (Object[]) obj;

    return new PersonRef(
        toPrivacyBase(parts[0])
        // citation_list=parts[1],

        );
  }

  public static Boolean toPrivacyBase(Object obj) {
    if (obj == null) {
      return null;
    }
    return (Boolean) obj;
  }

  public static Attribute toAttribute(Object obj) {
    //   return (
    //     PrivacyBase.serialize(self),
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     self.type.serialize(),
    //     self.value,
    // )
    var parts = (Object[]) obj;

    var privacy = (Boolean) parts[0];
    // CitationBase
    // NoteBase
    var typeIdx = (Integer) (((Object[]) parts[3])[0]);
    var type = typeIdx == null || typeIdx < 0 ? null : AttributeType.values()[typeIdx];
    var customType = Objects.toString((((Object[]) parts[3])[1]));
    var value = Objects.toString(parts[4]);

    return new Attribute(type, customType, value, privacy);
  }
}
