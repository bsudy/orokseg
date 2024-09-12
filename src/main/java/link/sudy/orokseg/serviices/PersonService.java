package link.sudy.orokseg.serviices;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.repository.PersonRepository;
import link.sudy.orokseg.serviices.converters.PersonConverter;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    

    private PersonRepository personRepository;
    private PersonConverter personConverter;
    
    public PersonService(PersonRepository personRepository, PersonConverter personConverter) {
        this.personRepository = personRepository;
        this.personConverter = personConverter;
    }

    public Iterable<Person> getPeople(int page, int pageSize) {
        var personList = personRepository.findAll(Pageable.ofSize(pageSize).withPage(page));
        return StreamSupport.stream(personList.spliterator(), false)
                .map(p -> this.personConverter.toPerson(p))
                .collect(Collectors.toList());
    }
}
