package link.sudy.orokseg.resources;

import link.sudy.orokseg.repository.NoteRepository;
import link.sudy.orokseg.serviices.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestConfig {

    @Bean
    public NoteService noteService(@Autowired NoteRepository noteRepository) {
        return new NoteService(noteRepository);
    }

    // Add other service beans as needed
}
