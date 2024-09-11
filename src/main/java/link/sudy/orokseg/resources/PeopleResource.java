package link.sudy.orokseg.resources;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PeopleResource {

    @GetMapping
    public String getPeople() {
        return "Hello, World!";
    }

}
