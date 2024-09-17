package link.sudy.orokseg.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Event {

  @AllArgsConstructor
  @Getter
  public static class EventRef {

    private List<String> citationHandleList;
    private List<String> noteHandleList;

    private Boolean privacy;
  }
}
