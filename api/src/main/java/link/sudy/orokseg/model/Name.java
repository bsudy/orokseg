package link.sudy.orokseg.model;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.val;

@Getter
@Setter(AccessLevel.PROTECTED)
@AllArgsConstructor
public class Name {

    private String givenName;
    private List<Surname> surnames;
    private String suffix;

    public String getDisplayName() {
        val surname = String.join(" ", surnames.stream().map(Surname::getSurname).toArray(String[]::new));
        return String.format("%s, %s %s", surname, givenName, suffix);
    }
    
    
}
