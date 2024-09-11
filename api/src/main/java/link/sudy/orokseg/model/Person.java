package link.sudy.orokseg.model;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter(AccessLevel.PROTECTED)
@AllArgsConstructor
public class Person {

    private String handle;
    private String grampsId;
    private Name name;

    private Gender gender;

    private List<Name> names;

    private List<String> familyRefList;
    private List<String> parentFamilyRefList;

    private List<String> noteRefList;

    public String getDisplayName() {
        return name != null ? name.getDisplayName() : "<Unknown>";
    }

}