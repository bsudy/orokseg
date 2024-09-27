package link.sudy.orokseg.serviices.converters;

import java.util.List;
import java.util.stream.Collectors;

public class ConversionUtils {

  public static List<String> toStringList(Object obj) {
    if (obj == null) {
      return List.of();
    }
    return PersonConverter.toList(obj).stream().map(Object::toString).collect(Collectors.toList());
  }

  public static List<Integer> toIntList(Object obj) {
    if (obj == null) {
      return List.of();
    }
    return PersonConverter.toList(obj).stream()
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
}
