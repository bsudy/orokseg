package link.sudy.orokseg.serviices.converters;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.EnumValue;

public class ConversionUtils {

  public static List<String> toStringList(Object obj) {
    if (obj == null) {
      return List.of();
    }
    return ConversionUtils.toList(obj).stream().map(Object::toString).collect(Collectors.toList());
  }

  public static List<Integer> toIntList(Object obj) {
    if (obj == null) {
      return List.of();
    }
    return ConversionUtils.toList(obj).stream()
        .map(
            o -> {
              if (o instanceof Integer) {
                return (Integer) o;
              }
              if (o instanceof Long) {
                return ((Long) o).intValue();
              }
              return Integer.parseInt(o.toString());
            })
        .collect(Collectors.toList());
  }

  public static List<Object> toList(Object obj) {
    if (obj == null) {
      return List.of();
    }
    if (obj.getClass().isArray()) {
      return Arrays.asList((Object[]) obj);
    }
    if (obj instanceof List) {
      return (List<Object>) obj;
    }
    throw new RuntimeException("Cannot convert to list: " + obj);
  }

  static <T extends Enum<T>> EnumValue<T> toEnumValue(Object obj, Class<T> enumClass) {
    var parts = (Object[]) obj;
    var value = enumClass.getEnumConstants()[(Integer) parts[0]];
    return new EnumValue(value, (String) parts[1]);
  }
}
