package link.sudy.orokseg.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.With;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    private String handle;
    private String grampsId;
    private StyledText text;
    private NoteFormat format;
    private NoteType type;
    private Integer change;
    private String tags;
    private Boolean privacy;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @With
    public static class NoteType {
        private NoteTypeEnum type;
        private String value;
    }


    public static enum NoteFormat {
        FLOWED, 
        FORMATTED
    }

    public static enum NoteTypeEnum {
            
        UNKNOWN(-1),
        CUSTOM(0),
        GENERAL(1),
        RESEARCH(2),
        TRANSCRIPT(3),
        PERSON(4),
        ATTRIBUTE(5),
        ADDRESS(6),
        ASSOCIATION(7),
        LDS(8),
        FAMILY(9),
        EVENT(10),
        EVENTREF(11),
        SOURCE(12),
        SOURCEREF(13),
        PLACE(14),
        REPO(15),
        REPOREF(16),
        MEDIA(17),
        MEDIAREF(18),
        CHILDREF(19),
        PERSONNAME(20),
        SOURCE_TEXT(21),
        CITATION(22),
        REPORT_TEXT(23),
        HTML_CODE(24),
        TODO(25),
        LINK(26),
        ANALYSIS(27);

        private final int value;

        private NoteTypeEnum(int value) {
            this.value = value;
        }

        public static NoteTypeEnum ofValue(int value) {
            for (var type : NoteTypeEnum.values()) {
                if (type.value == value) {
                    return type;
                }
            }
            return UNKNOWN;
        }

        public int toValue() {
            return value;
        } 
    }
}