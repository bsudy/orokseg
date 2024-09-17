package link.sudy.orokseg.resources;

import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.serviices.PersonService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
            @RequestParam(required = false, defaultValue = "1") final Integer page,
            @RequestParam(required = false, defaultValue = "20") final Integer pageSize) {
        if (pageSize > 500) {
            throw new IllegalArgumentException("Page size must be less than 300");
        }
        if (pageSize < 1) {
            throw new IllegalArgumentException("Page size must be greater than 0");
        }
        if (page < 1) {
            throw new IllegalArgumentException("Page must be greater than 0");
        }

        return personService.getPersons(page, pageSize).getPersons();
    }

    @GetMapping("/{id}")
    public Person getById(@PathVariable String id) {
        return personService.getByGrampsId(id).orElseThrow();
    }


}
