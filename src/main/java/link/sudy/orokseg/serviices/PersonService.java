package link.sudy.orokseg.serviices;

import link.sudy.orokseg.repository.PersonRepository;
import link.sudy.orokseg.repository.model.Person;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    

    private PersonRepository personRepository;
    
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Iterable<Person> getPeople() {
        return personRepository.findAll();
    }
}
