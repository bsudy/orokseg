package link.sudy.orokseg.serviices.converters;

import java.util.List;
import link.sudy.orokseg.model.Date;
import link.sudy.orokseg.model.Event;
import link.sudy.orokseg.model.Event.EventRef;
import link.sudy.orokseg.repository.model.DBEvent;
import lombok.extern.slf4j.Slf4j;
import lombok.val;

@Slf4j
public class EventConverter {

  public static Event toEvent(DBEvent dbEvent) {

    val obj = PickleUtils.unpickle(dbEvent.getBlobData());
    var parts = (Object[]) obj;

    //   return (
    //     self.handle,
    //     self.gramps_id,
    //     self.__type.serialize(),
    //     DateBase.serialize(self, no_text_date),
    //     self.__description,
    //     self.place,
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     MediaBase.serialize(self),
    //     AttributeBase.serialize(self),
    //     self.change,
    //     TagBase.serialize(self),
    //     self.private,
    // )

    var handle = (String) parts[0];
    var grampsId = (String) parts[1];
    var type = ConversionUtils.toEnumValue(parts[2], Event.EventType.class);
    var date = toDate(parts[3]);

    // [0, 0, 0, [6, 12, 1956, false], , 2435814, 0]

    var description = (String) parts[4];
    // var place = (String) parts[5];
    var citationHandleList = BaseConverters.toCitationBase(parts[6]);
    // TODO notes 7
    // TODO media 8
    var attributes = BaseConverters.toAttributeList(parts[9]);
    var change = (Integer) parts[10];
    // TODO tags 11
    var privacy = (Boolean) parts[12];

    return new Event(handle, grampsId, type, date, description, citationHandleList, attributes);
  }

  public static List<EventRef> toEventRefsList(Object obj) {
    return ((List<Object[]>) obj).stream().map(EventConverter::toEventRef).toList();
  }

  public static EventRef toEventRef(Object obj) {
    // return (
    //     PrivacyBase.serialize(self),
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     AttributeBase.serialize(self),
    //     RefBase.serialize(self),
    //     self.__role.serialize(),
    // )
    var parts = (Object[]) obj;
    val privacy = (Boolean) parts[0];
    // CitationBase
    val citationHandleList = BaseConverters.toCitationBase(parts[1]);
    // NoteBase
    var noteHandleList = (List<String>) parts[2];
    // TODO AttributeBase

    var ref = (String) parts[4];

    log.info(
        "EventRef: privacy: {}, citationHandleList: {}, noteHandleList: {}, ref: {}",
        privacy,
        citationHandleList,
        noteHandleList,
        ref);

    return new EventRef(citationHandleList, noteHandleList, ref, privacy);
  }

  private static Date toDate(Object obj) {
    if (obj == null) {
      return null;
    }
    val parts = (Object[]) obj;
    // [0, 0, 0, [6, 12, 1956, false], , 2435814, 0]

    var calendar = Date.CalendarType.values()[(Integer) parts[0]];
    var modifier = Date.DateModifier.values()[(Integer) parts[1]];
    var quality = (Integer) parts[2];
    var dateval = (Object[]) parts[3];
    var year = (Integer) dateval[2];
    var month = (Integer) dateval[1];
    var day = (Integer) dateval[0];
    var startDate = new Date.DateDay(year, month, day);
    // the last part is either a boolean or something el. It's used to determine if the date is a
    // range or not.
    final Date.DateDay endDate;
    if (dateval.length > 4) {
      var endYear = (Integer) dateval[6];
      var endMonth = (Integer) dateval[5];
      var endDay = (Integer) dateval[4];
      endDate = new Date.DateDay(endYear, endMonth, endDay);
    } else {
      endDate = null;
    }

    var text = (String) parts[4];
    var sortval = (Integer) parts[5];
    var newyear = Date.NewYearType.values()[parts.length > 6 ? (Integer) parts[6] : 0];

    return new Date(calendar, newyear, modifier, startDate, endDate, text);
  }
}
