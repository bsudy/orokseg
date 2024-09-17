package link.sudy.orokseg.serviices;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.model.PersonList;
import link.sudy.orokseg.repository.PersonRepository;
import link.sudy.orokseg.serviices.converters.PersonConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    

    private static final Logger LOGGER = LoggerFactory.getLogger(PersonService.class);

    private PersonRepository personRepository;
    
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public PersonList getPersons(int page, int pageSize) {
        // Adding +1 in order to know if there are more pages
        LOGGER.info("Getting persons, page: " + page + ", pageSize: " + pageSize);
        var personList = personRepository.findAll(PageRequest.ofSize(pageSize + 1).withPage(page - 1));
        LOGGER.info("Got persons: Total Elements " + personList.getTotalElements());
        LOGGER.info("Got persons: Size " + personList.getSize());
        LOGGER.info("Got persons: Number " + personList.getNumber());
        LOGGER.info("Got persons: Number of Elements " + personList.getNumberOfElements());
        
        return new PersonList(
            StreamSupport.stream(personList.spliterator(), false)
                .limit(pageSize)
                .map(PersonConverter::toPerson).collect(Collectors.toList()),
            personList.getNumberOfElements() > pageSize
        );
    }

    public Optional<Person> getByHandle(String id) {
        return personRepository.findById(id).map(p -> PersonConverter.toPerson(p));
    }

    public Optional<Person> getByGrampsId(String grampsId) {
        return personRepository.findByGrampsId(grampsId).map(p -> PersonConverter.toPerson(p));
    }

}
