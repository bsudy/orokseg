package link.sudy.orokseg.serviices;

import java.util.Optional;
import java.util.stream.StreamSupport;
import link.sudy.orokseg.model.Event;
import link.sudy.orokseg.repository.EventRepository;
import link.sudy.orokseg.serviices.converters.EventConverter;
import lombok.val;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EventService {

  private final EventRepository eventRepository;

  public EventService(final EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public Iterable<Event> getEvents(final int page, final int pageSize) {
    val events = this.eventRepository.findAll(Pageable.ofSize(pageSize).withPage(page));
    return StreamSupport.stream(events.spliterator(), false)
        .map(
            (dbEvent) -> {
              return EventConverter.toEvent(dbEvent);
            })
        .collect(java.util.stream.Collectors.toList());
  }

  public Optional<Event> getEventById(String id) {
    return this.eventRepository
        .findByGrampsId(id)
        .map((dbFamily) -> EventConverter.toEvent(dbFamily));
  }

  public Optional<Event> getEventByHandle(String handle) {
    return this.eventRepository.findById(handle).map((family) -> EventConverter.toEvent(family));
  }
}
