package link.sudy.orokseg.model;

import java.util.List;
import java.util.Map;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
public class FamilyTree {


    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class PersonWithDetails extends Person {

        public PersonWithDetails(Person person, Event birthEvent, Event deathEvent, List<Attribute> attributes) {
            super(person.getHandle(), person.getGrampsId(), person.getName(), person.getGender(), person.getNames(), person.getFamilyRefList(), person.getParentFamilyRefList(), person.getNoteRefList(), person.getMediumRefs(), person.getAttributes(), person.getEvents(), person.getBirthEvent(), person.getDeathEvent());
            this.birth = birthEvent;
            this.death = deathEvent;
            this.attributes = attributes;
        }
        private final Event birth;
        private final Event death;
        private final List<Attribute> attributes;

    }

    @Data
    public static class ChildWithFamilies {
        private final Person person;
        /** partner and the kids */
        private final List<ChildFamily> families;

        @Data
        public static class ChildFamily {
            private final Person partner;
            private final List<ChildWithFamilies> children;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class FamilyWithMembers extends Family {

        public FamilyWithMembers(Family family, Person father, Person mother) {
            super(family.getHandle(), family.getGrampsId(), family.getFatherHandle(), family.getMotherHandle(), family.getChildren(), family.getFamilyType(), family.getEventRefs(), family.getMediumRefs(), family.getCitationHandleList(), family.getNoteHandleList(), family.getChange(), family.getPrivacy(), family.getBlobJson());
            this.father = father;
            this.mother = mother;
        }

        private final Person father;
        private final Person mother;

    }


    private final FamilyWithMembers family;
    private final Map<Integer, List<FamilyWithMembers>> up;

    private final List<ChildWithFamilies> children;

    // private final Map<Integer, List<Family>> down;


    
}
