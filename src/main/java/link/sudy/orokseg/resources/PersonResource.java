package link.sudy.orokseg.resources;

import link.sudy.orokseg.repository.model.Person;
import link.sudy.orokseg.serviices.PersonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
