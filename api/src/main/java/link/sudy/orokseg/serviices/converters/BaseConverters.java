package link.sudy.orokseg.serviices.converters;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.Attribute;
import link.sudy.orokseg.model.Attribute.AttributeType;

public class BaseConverters {

  public static List<Attribute> toAttributeList(Object obj) {
    return ConversionUtils.toList(obj).stream()
        .map(BaseConverters::toAttribute)
        .collect(Collectors.toList());
  }

  public static Attribute toAttribute(Object obj) {
    //   return (
    //     PrivacyBase.serialize(self),
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     self.type.serialize(),
    //     self.value,
    // )
    var parts = (Object[]) obj;

    var privacy = (Boolean) parts[0];
    // CitationBase
    // NoteBase
    var typeIdx = (Integer) (((Object[]) parts[3])[0]);
    var type = typeIdx == null || typeIdx < 0 ? null : AttributeType.values()[typeIdx];
    var customType = Objects.toString((((Object[]) parts[3])[1]));
    var value = Objects.toString(parts[4]);

    return new Attribute(type, customType, value, privacy);
  }

  public static Boolean toPrivacyBase(Object obj) {
    if (obj == null) {
      return null;
    }
    return (Boolean) obj;
  }

  static List<String> toCitationBase(Object obj) {
    return (List<String>) obj;
  }
}
