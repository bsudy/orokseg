package link.sudy.orokseg.serviices.converters;

import static link.sudy.orokseg.serviices.converters.ConversionUtils.toIntList;
import static link.sudy.orokseg.serviices.converters.ConversionUtils.toStringList;

import link.sudy.orokseg.model.Media.MediaRef;
import link.sudy.orokseg.model.Media.Rectangle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MediaConverter {

  private static final Logger LOGGER = LoggerFactory.getLogger(MediaConverter.class);

  public static MediaRef toMediaRef(Object obj) {

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
    return new MediaRef(
        ref,
        isPrivate,
        noteRefList,
        rectangle.size() == 4
            ? new Rectangle(rectangle.get(0), rectangle.get(1), rectangle.get(2), rectangle.get(3))
            : null);
  }
}
