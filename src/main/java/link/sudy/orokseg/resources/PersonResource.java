package link.sudy.orokseg.resources;

import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.serviices.PersonService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("persons")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonResource {

    private PersonService personService;
    
    public PersonResource(PersonService personService) {
        this.personService = personService;
    }


    @GetMapping
    public Iterable<Person> getPeople(
            @RequestParam(required = false, defaultValue = "0") final Integer page,
            @RequestParam(required = false, defaultValue = "20") final Integer pageSize) {
        if (pageSize > 500) {
            throw new IllegalArgumentException("Page size must be less than 300");
        }
        return personService.getPeople(page, pageSize);
    }

}
