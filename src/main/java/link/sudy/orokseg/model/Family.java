package link.sudy.orokseg.model;

import java.util.List;
import link.sudy.orokseg.model.Event.EventRef;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter(AccessLevel.PROTECTED)
@AllArgsConstructor
public class Family {

    private String handle;
    private String grampsId;
    private String fatherHandle;
    private String motherHandle;

    private List<ChildRef> children;
    private FamilyType familyType;
    private List<EventRef> eventRefs;

    private List<String> citationHandleList;
    private List<String> noteHandleList;

    private Integer change;
    private Boolean privacy;
    
    private String blobJson;
    

    @Getter
    @Setter(AccessLevel.PROTECTED)
    @AllArgsConstructor
    public static class ChildRef {
        private String handle;
        private ChildRelationType motherRelationType;
        private ChildRelationType fatherRelationType;
        private List<String> citationHandleList;
        private List<String> noteHandleList;

        private Boolean privacy;

    }
    
    public static enum ChildRelationType {
        NONE, // = 0
        BIRTH, // = 1
        ADOPTED, // = 2
        STEPCHILD, // = 3
        SPONSORED, // = 4
        FOSTER, // = 5
        UNKNOWN, // = 6
        CUSTOM // = 7
    }

    public static enum FamilyType {
        MARRIED, // = 0
        UNMARRIED, // = 1
        CIVIL_UNION, // = 2
        UNKNOWN, // = 3
        CUSTOM, // = 4
    }
}
