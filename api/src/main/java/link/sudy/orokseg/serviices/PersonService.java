package link.sudy.orokseg.serviices;

import java.util.Optional;
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
    
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public Iterable<Person> getPersons(int page, int pageSize) {
        var personList = personRepository.findAll(Pageable.ofSize(pageSize).withPage(page));
        return StreamSupport.stream(personList.spliterator(), false)
                .map(p -> PersonConverter.toPerson(p))
                .collect(Collectors.toList());
    }

    public Optional<Person> getByHandle(String id) {
        return personRepository.findById(id).map(p -> PersonConverter.toPerson(p));
    }

    public Optional<Person> getByGrampsId(String grampsId) {
        return personRepository.findByGrampsId(grampsId).map(p -> PersonConverter.toPerson(p));
    }

}
