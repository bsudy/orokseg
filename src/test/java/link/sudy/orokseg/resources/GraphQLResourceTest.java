package link.sudy.orokseg.resources;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import java.util.Optional;
import link.sudy.orokseg.NoteConverterTest;
import link.sudy.orokseg.repository.NoteRepository;
import link.sudy.orokseg.serviices.FamilyService;
import link.sudy.orokseg.serviices.PersonService;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.graphql.test.tester.GraphQlTester;

@GraphQlTest(value = GraphQLResource.class)
@Import(TestConfig.class)
public class GraphQLResourceTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    NoteRepository noteRepositoryMock;

    @MockBean
    PersonService personService;

    @MockBean
    FamilyService familyService;

    @Test
    void shouldGetNoteByGrampsId() throws JsonMappingException, JsonProcessingException {

        when(noteRepositoryMock.findByGrampsId(anyString()))
                 .thenReturn(Optional.of(NoteConverterTest.TEST_NOTE));

        this.graphQlTester
				.documentName("getNoteById")
				.variable("id", "N0000")
                .execute()
                .errors()
                .verify()
                .path("noteById")
                .matchesJson("""
                {
                    "handle": "fac4a686369713d9cd55159ada9",
                    "grampsId": "N0000",
                    "text": {
                        "text": "This is a note",
                        "tags": []
                    }
                }
                """);
    }
}