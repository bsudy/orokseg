package link.sudy.orokseg.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter(AccessLevel.PROTECTED)
@AllArgsConstructor
public class Surname {

  private String surname;
  private String prefix;
  private Boolean primary;
  // TODO origintype
  // TODO connector
}
