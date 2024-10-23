package link.sudy.orokseg.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.With;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@With
public class EnumValue<T extends Enum<T>> {
  private T type;
  private String value;
}
