package link.sudy.orokseg.serviices;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.repository.PersonRepository;
import link.sudy.orokseg.serviices.converters.PersonConverter;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    

    private PersonRepository personRepository;
    private PersonConverter personConverter;
    
    public PersonService(PersonRepository personRepository, PersonConverter personConverter) {
        this.personRepository = personRepository;
        this.personConverter = personConverter;
    }

    public Iterable<Person> getPeople() {
        var personList = personRepository.findAll();
        return StreamSupport.stream(personList.spliterator(), false)
                .map(p -> this.personConverter.toPerson(p))
                .collect(Collectors.toList());
    }
}
