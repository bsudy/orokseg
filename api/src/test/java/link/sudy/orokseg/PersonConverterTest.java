package link.sudy.orokseg;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Base64;
import link.sudy.orokseg.model.Gender;
import link.sudy.orokseg.repository.model.DBPerson;
import link.sudy.orokseg.serviices.converters.PersonConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PersonConverterTest {
    
    private final static byte[] JANE_DOE_BLOB = Base64.getDecoder().decode("gASVHQEAAAAAAAAojBtmYjJiZTQ1ZGE4MTdkYTg1NmM0NDhhNDNhMjiUjAVJMDAwMZRLACiJXZRdlE6MBEphbmWUXZQojANSb2WUjACUiEsBaAeGlGgHdJRhaAdoB0sCaAeGlGgHSwBLAGgHaAdoB3SUXZQoiV2UXZROjARKYW5llF2UKGgHjANEb2WUiEsBaAeGlGgHdJRhaAdoB0sCaAeGlGgHSwBLAGgHaAdoB3SUYUr/////SwBdlCiJXZRdlF2UjBtmYjJiZTRhY2JmZjYxNmVhZGYyZTFmZTMzNjKUSwFoB4aUdJRhXZSMG2ZiMmJlNDU4MDNhMmQzZWE5OWIyZTQzNDk5NZRhXZRdlF2UXZRdlF2UXZRdlEqRruFmXZSJXZR0lC4=");

    private final static DBPerson JANE_DOE_DB_PERSON = new DBPerson(
        "fb2be45da817da856c448a43a28",    
        "I0001",        
        "Jane",
        "Roe",        
        0,
        -1,
        0,
        1726066321,                        
        JANE_DOE_BLOB,
        false
    );

    private PersonConverter personConverter;

    @BeforeEach
    public void setUp() {
        this.personConverter = new PersonConverter();
    }


    @Test
    public void testToPerson() {
        var person = this.personConverter.toPerson(JANE_DOE_DB_PERSON);
        assertEquals("fb2be45da817da856c448a43a28", person.getHandle());
        assertEquals("I0001", person.getGrampsId());
        assertEquals("Jane", person.getName().getGivenName());
        
        assertEquals(1, person.getName().getSurnames().size());
        assertEquals("Roe", person.getName().getSurnames().get(0).getSurname());
        assertEquals(Gender.FEMALE, person.getGender());
        // assertEquals(-1, person.getName().getDeathRefIndex());
        // assertEquals(0, person.getName().getBirthRefIndex());
        // assertEquals(1726066321, person.getName().getChange());
        // assertEquals(JANE_DOE_BLOB, person.getBlob());
        // assertEquals(false, person.getIsPrivate());

        assertEquals(1, person.getFamilyRefList().size());
        assertEquals("fb2be45803a2d3ea99b2e434995", person.getFamilyRefList().get(0));
        assertEquals(0, person.getParentFamilyRefList().size());
    }

}
