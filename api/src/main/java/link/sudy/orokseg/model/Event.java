package link.sudy.orokseg.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Event {

  private String handle;
  private String grampsId;
  private EnumValue<EventType> type;
  private Date date;
  private String description;
  private List<String> citationHandleList;
  private List<Attribute> attributes;

  public static enum EventType {
    CUSTOM, // = 0
    MARRIAGE, // = 1
    MARR_SETTL, // = 2
    MARR_LIC, // = 3
    MARR_CONTR, // = 4
    MARR_BANNS, // = 5
    ENGAGEMENT, // = 6
    DIVORCE, // = 7
    DIV_FILING, // = 8
    ANNULMENT, // = 9
    MARR_ALT, // = 10
    ADOPT, // = 11
    BIRTH, // = 12
    DEATH, // = 13
    ADULT_CHRISTEN, // = 14
    BAPTISM, // = 15
    BAR_MITZVAH, // = 16
    BAS_MITZVAH, // = 17
    BLESS, // = 18
    BURIAL, // = 19
    CAUSE_DEATH, // = 20
    CENSUS, // = 21
    CHRISTEN, // = 22
    CONFIRMATION, // = 23
    CREMATION, // = 24
    DEGREE, // = 25
    EDUCATION, // = 26
    ELECTED, // = 27
    EMIGRATION, // = 28
    FIRST_COMMUN, // = 29
    IMMIGRATION, // = 30
    GRADUATION, // = 31
    MED_INFO, // = 32
    MILITARY_SERV, // = 33
    NATURALIZATION, // = 34
    NOB_TITLE, // = 35
    NUM_MARRIAGES, // = 36
    OCCUPATION, // = 37
    ORDINATION, // = 38
    PROBATE, // = 39
    PROPERTY, // = 40
    RELIGION, // = 41
    RESIDENCE, // = 42
    RETIREMENT, // = 43
    WILL, // = 44
    STILLBIRTH // = 45
  }

  @AllArgsConstructor
  @Getter
  public static class EventRef {

    private List<String> citationHandleList;
    private List<String> noteHandleList;

    private String handle;

    private Boolean privacy;
  }
}
