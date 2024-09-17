package link.sudy.orokseg.model;

import java.util.List;
import lombok.Data;

@Data
public class PersonList {
        
    private final List<Person> persons;
    private final Boolean hasMore;
}
