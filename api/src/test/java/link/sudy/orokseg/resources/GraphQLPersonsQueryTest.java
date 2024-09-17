package link.sudy.orokseg.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import java.util.Base64;
import java.util.List;
import link.sudy.orokseg.repository.PersonRepository;
import link.sudy.orokseg.repository.model.DBPerson;
import link.sudy.orokseg.serviices.FamilyService;
import link.sudy.orokseg.serviices.NoteService;
import lombok.val;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.test.tester.GraphQlTester;

@GraphQlTest(value = GraphQLResource.class)
@Import(TestPersonServiceConfig.class)
public class GraphQLPersonsQueryTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    PersonRepository personRepositoryMock;

    @MockBean
    NoteService noteService;

    @MockBean
    FamilyService familyService;

    @Test
    void shouldRetrievePersons() throws JsonMappingException, JsonProcessingException {

        val johnDoeDB = DBPerson.builder().grampsId("I0000").blobData(Base64.getDecoder().decode("gASVRAEAAAAAAAAojBtmYWM0YTY1MTVhMzcyMjM3ZGYyYTgwMGVlM2GUjAVJMDAwMJRLASiJXZRdlE6MBEpvaG6UXZQojANEb2WUjACUiEsBaAeGlGgHdJRhaAdoB0sCaAeGlGgHSwBLAGgHaAdoB3SUXZRK/////0sAXZQoiV2UXZRdlIwbZmIyY2ZiOWZlZDYxZDE3NGViYmFhOTZmM2U5lEsBaAeGlHSUYV2UjBtmYjJiZTQ1ODAzYTJkM2VhOTliMmU0MzQ5OTWUYV2UXZRdlF2UKIldlF2USv////9oB4aUjBNUaGlzIGlzIGFuIGF0dGlidXRllHSUYV2UXZRdlIwaZmFjNGE3MmEwMWIxNjgxMjkzZWExZWU4ZDmUYV2UjBtmYWM0YTY4NjM2OTcxM2Q5Y2Q1NTE1OWFkYTmUYUrCruFmXZSJXZR0lC4=")).build();
        val janeDoeDB = DBPerson.builder().grampsId("i0001").blobData(Base64.getDecoder().decode("gASVHQEAAAAAAAAojBtmYjJiZTQ1ZGE4MTdkYTg1NmM0NDhhNDNhMjiUjAVJMDAwMZRLACiJXZRdlE6MBEphbmWUXZQojANSb2WUjACUiEsBaAeGlGgHdJRhaAdoB0sCaAeGlGgHSwBLAGgHaAdoB3SUXZQoiV2UXZROjARKYW5llF2UKGgHjANEb2WUiEsBaAeGlGgHdJRhaAdoB0sCaAeGlGgHSwBLAGgHaAdoB3SUYUr/////SwBdlCiJXZRdlF2UjBtmYjJiZTRhY2JmZjYxNmVhZGYyZTFmZTMzNjKUSwFoB4aUdJRhXZSMG2ZiMmJlNDU4MDNhMmQzZWE5OWIyZTQzNDk5NZRhXZRdlF2UXZRdlF2UXZRdlEqRruFmXZSJXZR0lC4=")).build();
        val janieDoeDB = DBPerson.builder().grampsId("I0002").blobData(Base64.getDecoder().decode("gASVtAAAAAAAAAAojBtmYjJiZTRiOTljNTJiZTA4MDI4ODZkODc5NzCUjAVJMDAwMpRLACiJXZRdlE6MBUphbmlllF2UKIwDRG9llIwAlIhLAWgHhpRoB3SUYWgHaAdLAmgHhpRoB0sASwBoB2gHaAd0lF2USv////9K/////12UXZRdlIwbZmIyYmU0NTgwM2EyZDNlYTk5YjJlNDM0OTk1lGFdlF2UXZRdlF2UXZRdlEqlPOFmXZSJXZR0lC4=")).build();
        val johnieDoeDB = DBPerson.builder().grampsId("I0003").blobData(Base64.getDecoder().decode("gASVtQAAAAAAAAAojBtmYjJiZTRmNjI0NzJhYTJkNTZhNjdkYjRmNmKUjAVJMDAwM5RLASiJXZRdlE6MBkpvaG5pZZRdlCiMA0RvZZSMAJSISwFoB4aUaAd0lGFoB2gHSwJoB4aUaAdLAEsAaAdoB2gHdJRdlEr/////Sv////9dlF2UXZSMG2ZiMmJlNDU4MDNhMmQzZWE5OWIyZTQzNDk5NZRhXZRdlF2UXZRdlF2UXZRKpTzhZl2UiV2UdJQu")).build();

        when(personRepositoryMock.findAll(any(Pageable.class)))
                 .thenReturn(new PageImpl<>(List.of(johnDoeDB, janeDoeDB, janieDoeDB, johnieDoeDB)));

        this.graphQlTester
				.documentName("persons")
				.variable("pageSize", 4)
                .variable("page", 1)
                .execute()
                .errors()
                .verify()
                .path("persons")
                .matchesJson("""
                    {
                        "persons": [
                            {
                            "grampsId": "I0000"
                            },
                            {
                            "grampsId": "I0001"
                            },
                            {
                            "grampsId": "I0002"
                            },
                            {
                            "grampsId": "I0003"
                            }
                        ],
                        "hasMore": false
                    }
                """);
    }
}