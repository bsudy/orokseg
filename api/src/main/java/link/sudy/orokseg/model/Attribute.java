package link.sudy.orokseg.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter(AccessLevel.PROTECTED)
@AllArgsConstructor
public class Attribute {

  private AttributeType type;
  private String customType;
  private String value;
  private Boolean privacy;

  public static enum AttributeType {
    // UNKNOWN = -1
    CUSTOM, // = 0
    CASTE, // = 1
    DESCRIPTION, // = 2
    ID, // = 3
    NATIONAL, // = 4
    NUM_CHILD, // = 5
    SSN, // = 6
    NICKNAME, // = 7
    CAUSE, // = 8
    AGENCY, // = 9
    AGE, // = 10
    FATHER_AGE, // = 11
    MOTHER_AGE, // = 12
    WITNESS, // = 13
    TIME, // = 14
    OCCUPATION, // = 15
  }
}
