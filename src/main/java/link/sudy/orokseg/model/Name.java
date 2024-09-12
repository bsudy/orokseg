package link.sudy.orokseg.model;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter(AccessLevel.PROTECTED)
@AllArgsConstructor
public class Name {

    private String givenName;
    private List<Surname> surnames;
    private String suffix;
    
    
}
