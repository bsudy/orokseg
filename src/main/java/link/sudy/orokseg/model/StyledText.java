package link.sudy.orokseg.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.With;

@Getter
@With
@NoArgsConstructor
@AllArgsConstructor
public class StyledText {
    
    private String text;
    private List<StyledTextTag> tags;

    @Getter
    @With
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StyledTextTag {
        private StyledTextTagType name;
        private String value;
        private List<StyledTextTagRange> ranges;
    }

    public static enum StyledTextTagType {
        NONE_TYPE(-1),
        BOLD(0),
        ITALIC(1),
        UNDERLINE(2),
        FONTFACE(3),
        FONTSIZE(4),
        FONTCOLOR(5),
        HIGHLIGHT(6),
        SUPERSCRIPT(7),
        LINK(8),
        STRIKETHROUGH(9),
        SUBSCRIPT(10);

        private int value;

        private StyledTextTagType(int value) {
            this.value = value;
        }

        public int toValue() {
            return value;
        }

        public static StyledTextTagType fromValue(int value) {
            for (StyledTextTagType type : StyledTextTagType.values()) {
                if (type.value == value) {
                    return type;
                }
            }
            return StyledTextTagType.NONE_TYPE;
        }
    }

    @Getter
    @With
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StyledTextTagRange {
        private Integer start;
        private Integer end;
    }

}
