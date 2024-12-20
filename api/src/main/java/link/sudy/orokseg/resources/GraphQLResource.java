package link.sudy.orokseg.resources;

import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.Event;
import link.sudy.orokseg.model.Event.EventRef;
import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.model.Family.ChildRef;
import link.sudy.orokseg.model.Medium;
import link.sudy.orokseg.model.Medium.MediumRef;
import link.sudy.orokseg.model.Note;
import link.sudy.orokseg.model.Person;
import link.sudy.orokseg.model.PersonList;
import link.sudy.orokseg.serviices.EventService;
import link.sudy.orokseg.serviices.FamilyService;
import link.sudy.orokseg.serviices.MediaService;
import link.sudy.orokseg.serviices.NoteService;
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
  private NoteService noteService;
  private MediaService mediaService;
  private EventService eventService;

  public GraphQLResource(
      PersonService personService,
      FamilyService familyService,
      NoteService noteService,
      MediaService mediaService,
      EventService eventService) {
    this.personService = personService;
    this.familyService = familyService;
    this.noteService = noteService;
    this.mediaService = mediaService;
    this.eventService = eventService;
  }

  @QueryMapping
  public Person personById(@Argument String id) {
    LOGGER.info("Getting person by id: " + id);
    return personService.getByGrampsId(id).orElseThrow();
  }

  @QueryMapping
  public PersonList persons(@Argument Integer page, @Argument Integer pageSize) {
    LOGGER.info("Getting all persons");
    return personService.getPersons(
        page != null ? page : 1,
        // TODO page size should be set back to 500
        pageSize == null || pageSize > 500 ? 100 : pageSize);
  }

  @QueryMapping
  public Family familyById(@Argument String id) {
    LOGGER.info("Getting family by id: " + id);
    return familyService.getFamilyById(id).orElseThrow();
  }

  @QueryMapping(name = "noteById")
  public Note noteById(@Argument String id) {
    LOGGER.info("Getting note by id: " + id);
    return noteService.getNoteByGrampsId(id).orElseThrow();
  }

  @SchemaMapping
  public Optional<Person> father(Family family) {
    if (family.getFatherHandle() == null) {
      return Optional.empty();
    }
    return personService.getByHandle(family.getFatherHandle());
  }

  @SchemaMapping
  public Optional<Person> mother(Family family) {
    if (family.getMotherHandle() == null) {
      return Optional.empty();
    }
    return personService.getByHandle(family.getMotherHandle());
  }

  @SchemaMapping(typeName = "Child", field = "person")
  public Optional<Person> childPerson(ChildRef childRef) {
    LOGGER.info("Getting child by handle: " + childRef.getHandle());
    return personService.getByHandle(childRef.getHandle());
  }

  @SchemaMapping(typeName = "Person", field = "families")
  public Iterable<Family> families(Person person) {
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

  @SchemaMapping(typeName = "Person", field = "notes")
  public Iterable<Note> children(Person person) {
    LOGGER.info("Getting notes for person: " + person.getHandle());
    return person.getNoteRefList().stream()
        .map(childRef -> noteService.getNoteByHandle(childRef).orElse(null))
        .filter(child -> child != null)
        .collect(Collectors.toList());
  }

  @SchemaMapping(typeName = "MediumRef", field = "medium")
  public Medium medium(MediumRef mediumRef) {
    return mediaService.getMediumByHandle(mediumRef.getHandle()).get();
  }

  @SchemaMapping(typeName = "EventRef", field = "event")
  public Event event(EventRef eventRef) {
    return eventService.getEventByHandle(eventRef.getHandle()).get();
  }
}
