package link.sudy.orokseg.serviices.converters;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Singleton;
import java.util.List;
import java.util.stream.Collectors;
import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.model.Family.ChildRef;
import link.sudy.orokseg.model.Family.ChildRelationType;
import link.sudy.orokseg.model.Family.FamilyType;
import link.sudy.orokseg.repository.model.DBFamily;
import lombok.val;
import net.razorvine.pickle.Unpickler;
import org.springframework.stereotype.Component;

@Singleton
@Component
public class FamilyConverter {

  private final ObjectMapper objectMapper;

  public FamilyConverter(final ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public Family toAPIFamily(DBFamily dbFamily) {

    val parts = (Object[]) PickleUtils.unpickle(dbFamily.getBlobData());

    // self.handle,
    var handle = (String) parts[0];
    // self.gramps_id,
    val grampsId = (String) parts[1];
    // self.father_handle,
    val fatherHandle = (String) parts[2];
    // self.mother_handle,
    val motherHandle = (String) parts[3];
    // [cr.serialize() for cr in self.child_ref_list],
    val childReferenceList = ((List<Object[]>) parts[4]).stream().map(this::toChildRef).toList();
    // self.type.serialize(),
    var familyType = FamilyType.values()[(Integer) ((Object[]) parts[5])[0]];
    // EventBase.serialize(self),
    val eventRefList = EventConverter.toEventRefsList(parts[6]);
    // TOOD MediaBase.serialize(self),
    var mediaRefList =
        ((List<Object>) parts[7])
            .stream().map(MediaConverter::toMediaRef).collect(Collectors.toList());
    // TODO AttributeBase.serialize(self),
    // TODO LdsOrdBase.serialize(self),
    // CitationBase.serialize(self),
    val citationHandleList = BaseConverters.toCitationBase(parts[10]);
    // NoteBase.serialize(self),
    val noteHandleList = (List<String>) parts[11];
    // self.change,
    val change = (Integer) parts[12];
    // TagBase.serialize(self),
    // self.private,
    val privacy = (Boolean) parts[14];

    return new Family(
        handle,
        grampsId,
        fatherHandle,
        motherHandle,
        childReferenceList,
        familyType,
        eventRefList,
        mediaRefList,
        citationHandleList,
        noteHandleList,
        change,
        privacy,
        toJsonString(dbFamily.getBlobData()));
  }

  private String toJsonString(byte[] data) {
    try {
      return objectMapper.writeValueAsString(new Unpickler().loads(data));
    } catch (Exception e) {
      return "Error: " + e.getMessage();
    }
  }

  private ChildRef toChildRef(Object obj) {
    val parts = (Object[]) obj;

    val privacy = (Boolean) parts[0];
    // CitationBase
    val citationHandleList = BaseConverters.toCitationBase(parts[1]);
    // NoteBase
    var noteHandleList = (List<String>) parts[2];
    // RefBase
    var childHandle = (String) parts[3];
    var fatherRelationType = (Integer) ((Object[]) parts[4])[0];
    var motherRelationType = (Integer) ((Object[]) parts[5])[0];

    //         return (
    //     PrivacyBase.serialize(self),
    //     CitationBase.serialize(self),
    //     NoteBase.serialize(self),
    //     RefBase.serialize(self),
    //     self.frel.serialize(),
    //     self.mrel.serialize(),
    // )

    ;
    return new ChildRef(
        childHandle,
        ChildRelationType.values()[motherRelationType],
        ChildRelationType.values()[fatherRelationType],
        citationHandleList,
        noteHandleList,
        privacy);
  }
}
