package link.sudy.orokseg.serviices;

import java.util.Optional;
import link.sudy.orokseg.model.Note;
import link.sudy.orokseg.repository.NoteRepository;
import link.sudy.orokseg.serviices.converters.NoteConverter;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

  private NoteRepository noteRepository;

  public NoteService(final NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  public Iterable<Note> getNotes(int page, int pageSize) {
    return noteRepository
        .findAll(Pageable.ofSize(pageSize).withPage(page))
        .map(NoteConverter::convertToNote);
  }

  public Optional<Note> getNoteByHandle(String handle) {
    return noteRepository.findById(handle).map(NoteConverter::convertToNote);
  }

  public Optional<Note> getNoteByGrampsId(String grampsId) {
    return noteRepository.findByGrampsId(grampsId).map(NoteConverter::convertToNote);
  }

  public void createNote() {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  public void deleteNote() {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  public void getNote() {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  public void updateNote() {
    throw new UnsupportedOperationException("Not implemented yet");
  }
}
