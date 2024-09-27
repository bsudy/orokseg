package link.sudy.orokseg.model;

import java.util.List;
import lombok.Data;

public class Media {

  @Data
  public static class Rectangle {
    private final Integer x1;
    private final Integer y1;
    private final Integer x2;
    private final Integer y2;
  }

  @Data
  public static class MediaRef {

    // RefBase.serialize(self),
    private final String handle;
    // PrivacyBase.serialize(self),
    private final Boolean isPrivate;
    // CitationBase.serialize(self),
    // private List<Object> citationList;
    // NoteBase.serialize(self),
    private final List<String> noteList;
    // AttributeBase.serialize(self),
    // private List<Object> attributeList;

    // self.rect,
    private final Rectangle rectangle;
  }
}
