package link.sudy.orokseg;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Base64;
import link.sudy.orokseg.model.Note.NoteFormat;
import link.sudy.orokseg.model.Note.NoteTypeEnum;
import link.sudy.orokseg.repository.model.DBNote;
import link.sudy.orokseg.serviices.converters.NoteConverter;
import lombok.val;
import org.junit.jupiter.api.Test;

public class NoteConverterTest {

  public static final String TEST_NOTE_B64 =
      "gASVUAAAAAAAAAAojBtmYWM0YTY4NjM2OTcxM2Q5Y2Q1NTE1OWFkYTmUjAVOMDAwMJSMDlRoaXMgaXMgYSBub3RllF2UhpRLAEsEjACUhpRKsvK2Zl2UiXSULg==";

  public static final DBNote TEST_NOTE =
      new DBNote(
          "fac4a686369713d9cd55159ada9",
          Base64.getDecoder().decode(TEST_NOTE_B64),
          "N0000",
          0,
          0,
          0);

  @Test
  public void testConvertNote() {

    val note = NoteConverter.convertToNote(TEST_NOTE);

    assertEquals("fac4a686369713d9cd55159ada9", note.getHandle());
    assertEquals(NoteTypeEnum.PERSON, note.getType().getType());
    assertEquals(NoteFormat.FLOWED, note.getFormat());
    assertEquals("This is a note", note.getText().getText());
  }
}
