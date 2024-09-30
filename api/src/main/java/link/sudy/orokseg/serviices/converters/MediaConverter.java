package link.sudy.orokseg.serviices.converters;

import static link.sudy.orokseg.serviices.converters.ConversionUtils.toIntList;
import static link.sudy.orokseg.serviices.converters.ConversionUtils.toStringList;

import link.sudy.orokseg.model.Medium;
import link.sudy.orokseg.model.Medium.MediumRef;
import link.sudy.orokseg.model.Medium.Rectangle;
import link.sudy.orokseg.repository.model.DBMedium;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MediaConverter {

  private static final Logger LOGGER = LoggerFactory.getLogger(MediaConverter.class);

  public static Medium toMedium(Object obj) {

    // self.handle,
    // self.gramps_id,
    // self.path,
    // self.mime,
    // self.desc,
    // self.checksum,
    // AttributeBase.serialize(self),
    // CitationBase.serialize(self),
    // NoteBase.serialize(self),
    // self.change,
    // DateBase.serialize(self, no_text_date),
    // TagBase.serialize(self),
    // self.private,

    var parts = (Object[]) obj;
    var handle = (String) parts[0];
    var grampsId = (String) parts[1];
    var path = (String) parts[2];
    var mime = (String) parts[3];
    var desc = (String) parts[4];
    var checksum = (String) parts[5];
    // var attributeList = toStringList(parts[6]);
    // var citationList = toStringList(parts[7]);
    // var noteList = toStringList(parts[8]);
    // var change = (String) parts[9];
    // var date = (String) parts[10];
    var tagList = toStringList(parts[11]);
    var isPrivate = (Boolean) parts[12];

    return new Medium(handle, grampsId, mime, desc, path, tagList, isPrivate);
  }

  public static MediumRef toMediaRef(Object obj) {

    // PrivacyBase.unserialize(self, privacy)
    // CitationBase.unserialize(self, citation_list)
    // NoteBase.unserialize(self, note_list)
    // AttributeBase.unserialize(self, attribute_list)
    // RefBase.unserialize(self, ref)

    LOGGER.info("Media object: {}", obj);

    var parts = (Object[]) obj;
    var isPrivate = (Boolean) parts[0];
    var noteRefList = toStringList(parts[2]);
    var ref = (String) parts[4];
    var rectangle = toIntList(parts[5]);
    return new MediumRef(
        ref,
        isPrivate,
        noteRefList,
        rectangle.size() == 4
            ? new Rectangle(rectangle.get(0), rectangle.get(1), rectangle.get(2), rectangle.get(3))
            : null);
  }

  public static Medium toMedium(DBMedium dbMedia) {
    val obj = PickleUtils.unpickle(dbMedia.getBlobData());
    return toMedium(obj);
  }
}
