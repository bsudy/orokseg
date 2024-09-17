package link.sudy.orokseg.resources;

import link.sudy.orokseg.repository.PersonRepository;
import link.sudy.orokseg.serviices.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestPersonServiceConfig {

    @Bean
    public PersonService personService(@Autowired PersonRepository personRepository) {
        return new PersonService(personRepository);
    }
}
