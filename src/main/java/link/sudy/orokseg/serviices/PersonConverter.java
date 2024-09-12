package link.sudy.orokseg.serviices;

import jakarta.inject.Singleton;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import link.sudy.orokseg.model.Gender;
import link.sudy.orokseg.model.Name;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.model.PersonRef;
import link.sudy.orokseg.model.Surname;
import link.sudy.orokseg.repository.model.DBPerson;
import lombok.val;
import net.razorvine.pickle.Unpickler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Singleton
@Component
public class PersonConverter {

    private final static Logger logger = LoggerFactory.getLogger(PersonConverter.class);

    public Object unpickle(byte[] blob) {
        var pickle = new Unpickler();
        try {
            return (Object) pickle.loads(blob);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            pickle.close();
        }
    }
    
    public Person toPerson(DBPerson dbPerson) {
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
        
        val obj = unpickle(dbPerson.getBlobData());
        logger.info("Converting person object: {}", obj);
        val parts = (Object[]) obj;

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

        logger.info("Converting names of person: {}", parts[4]);
        logger.info("Converting names of person: {}", parts[4].getClass());
        logger.info("Converting names of person: {}", parts[4].getClass().isArray());

        val alternateNames = toList(parts[4]).stream().map(this::toName)
                .collect(Collectors.toList());
        // var deathRefIndex = (Integer) parts[5];
        // var birthRefIndex = (Integer) parts[6];
        // // var eventRefs = toStringList(parts[7]);
        val familyRefList = toStringList(parts[8]);
        val parentFamilyRefList = toStringList(parts[9]);

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
            parentFamilyRefList
            // obj,
            // blob64
        );
    }

    public Name toName(Object obj) {

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
            toList(parts[5]).stream().map(this::toSurname)
                .collect(Collectors.toList()),
            Objects.toString(parts[6])
                    // Title
                    // Type
        );
    }
    
    private Surname toSurname(Object obj) {
        // return (
        //     self.surname,
        //     self.prefix,
        //     self.primary,
        //     self.origintype,
        //     self.connector,
        // )
        var parts = (Object[]) obj;
        return new Surname(
                Objects.toString(parts[0]),
                Objects.toString(parts[1]),
                (Boolean) parts[2]
        );
    }   

    public List<Object> toList(Object obj) {
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

    public List<String> toStringList(Object obj) {
        if (obj == null) {
            return List.of();
        }
        return toList(obj).stream().map(Object::toString).collect(Collectors.toList());
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
    
    public Object toPersonRef(Object obj) {
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

    public Boolean toPrivacyBase(Object obj) {
        if (obj == null) {
            return null;
        }
        return (Boolean) obj;
    }

}
