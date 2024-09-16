package link.sudy.orokseg.serviices.converters;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.Note;
import link.sudy.orokseg.model.Note.NoteFormat;
import link.sudy.orokseg.model.Note.NoteType;
import link.sudy.orokseg.model.Note.NoteTypeEnum;
import link.sudy.orokseg.model.StyledText;
import link.sudy.orokseg.model.StyledText.StyledTextTag;
import link.sudy.orokseg.model.StyledText.StyledTextTagRange;
import link.sudy.orokseg.repository.model.DBNote;
import lombok.val;
import org.slf4j.Logger;

public class NoteConverter {

    private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(NoteConverter.class);
    
    public static Note convertToNote(DBNote dbNote) {
        val blobData = dbNote.getBlobData();
        Object[] unpickledData = (Object[]) PickleUtils.unpickle(blobData);

        var blob64 = Base64.getEncoder().encodeToString(dbNote.getBlobData());
        LOGGER.info("Converting note object: {}", blob64);

        Note note = new Note();
        note.setHandle((String) unpickledData[0]);
        note.setGrampsId((String) unpickledData[1]);
        note.setText(toStyledText(unpickledData[2]));
        note.setFormat(NoteFormat.values()[(Integer) unpickledData[3]]);
        note.setType(NoteConverter.toNoteType((Object[])unpickledData[4]));
        note.setChange((Integer) unpickledData[5]);
        // note.setTags((String) unpickledData[6]);
        note.setPrivacy((Boolean) unpickledData[7]);

        return note;
    }

    public static NoteType toNoteType(Object[] parts) {
        return new NoteType(
            NoteTypeEnum.ofValue((Integer)parts[0]),
            (String)parts[1]
        );
    }

    private static StyledText toStyledText(Object obj) {
        val parts = (Object[]) obj;
        val text = (String) parts[0];
        var tags = ((List<Object[]>) parts[1]).stream()
        .map(NoteConverter::toStyledTextTag)
        .collect(Collectors.toList());

        return new StyledText(
            text,
            tags
        );
    }

    private static StyledTextTag toStyledTextTag(Object[] parts) {

        var rawRanges = (List<Object[]>) parts[2];
        var ranges = rawRanges.stream()
        .map(pair -> new StyledTextTagRange((Integer) pair[0], (Integer) pair[1]))
        .collect(Collectors.toList());

        return new StyledTextTag(
            StyledText.StyledTextTagType.fromValue((Integer) parts[0]),
            (String) parts[1],
            ranges
        );
    }
}
