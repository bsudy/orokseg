package link.sudy.orokseg.model;

import lombok.Data;

@Data
public class Date {

  private final CalendarType calendarType;
  private final NewYearType newYearType;
  private final DateModifier dateModifier;
  private final DateDay startDate;
  private final DateDay endDate;
  private final String text;

  @Data
  public static class DateDay {
    private final Integer year, month, day;
  }

  public static enum CalendarType {
    GREGORIAN,
    JULIAN,
    FRENCH,
    HEBREW,
    ISLAMIC,
    PERSIAN,
    UNKNOWN,
  }

  public static enum NewYearType {
    JANUARY_1,
    MARCH_25,
    JULY_1,
    SEPTEMBER_1,
    SEPTEMBER_14,
    UNKNOWN,
  }

  public enum DateModifier {
    BEFORE,
    AFTER,
    ABOUT,
    BETWEEN,
    FROM,
    TO,
    UNKNOWN,
  }
}
