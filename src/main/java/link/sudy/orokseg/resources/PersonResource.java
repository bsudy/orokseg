package link.sudy.orokseg.resources;

import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.serviices.PersonService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public Iterable<Person> getPeople() {
        return personService.getPeople();
    }

}
