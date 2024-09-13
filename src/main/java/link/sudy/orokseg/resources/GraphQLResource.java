package link.sudy.orokseg.resources;

import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.model.Family.ChildRef;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.serviices.FamilyService;
import link.sudy.orokseg.serviices.PersonService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GraphQLResource {

    private static final Logger LOGGER = Logger.getLogger(GraphQLResource.class.getName());
    
    private PersonService personService;
    private FamilyService familyService;
    
    public GraphQLResource(PersonService personService, FamilyService familyService) {
        this.personService = personService;
        this.familyService = familyService;
    }

    @QueryMapping
    public Person personById(@Argument String id) {
        LOGGER.info("Getting person by id: " + id);
        return personService.getByGrampsId(id).orElse(null);
    }

    @QueryMapping
    public Family familyById(@Argument String id) {
        LOGGER.info("Getting family by id: " + id);
        return familyService.getFamilyById(id).orElse(null);
    }

    @SchemaMapping
    public Optional<Person> father(Family family) {
        return personService.getByHandle(family.getFatherHandle());
    }

    @SchemaMapping
    public Optional<Person> mother(Family family) {
        return personService.getByHandle(family.getFatherHandle());
    }

    @SchemaMapping(typeName = "Child", field = "person")
    public Optional<Person> childPerson(ChildRef childRef) {
        LOGGER.info("Getting child by handle: " + childRef.getHandle());
        return personService.getByHandle(childRef.getHandle());
    }

    @SchemaMapping(typeName = "Person")
    public Iterable<Family> famillies(Person person) {
        LOGGER.info("Getting families for person: " + person.getHandle());
        LOGGER.info("Family refs: " + person.getFamilyRefList());
        return person.getFamilyRefList().stream()
                .map(familyRef -> familyService.getFamilyByHandle(familyRef).orElse(null))
                .filter(family -> family != null)
                .collect(Collectors.toList());
    }

    @SchemaMapping(typeName = "Person")
    public Iterable<Family> parentFamilies(Person person) {
        LOGGER.info("Getting parent families for person: " + person.getHandle());
        LOGGER.info("Parent family refs: " + person.getParentFamilyRefList());
        return person.getParentFamilyRefList().stream()
                .map(familyRef -> familyService.getFamilyByHandle(familyRef).orElse(null))
                .filter(family -> family != null)
                .collect(Collectors.toList());
    } 
}
