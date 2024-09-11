package link.sudy.orokseg.repository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.type.NumericBooleanConverter;

@Entity
@Getter
@Setter
public class Person {
    @Id
    @Setter(AccessLevel.PROTECTED)
    private String handle;
    @Column(name = "gramps_id")
    private String grampsId;

    @Column(name = "given_name")
    private String givenName;
    private String surname;

    private Integer gender;

    @Column(name = "birth_ref_index")
    private Integer deathRefIndex;

    @Column(name = "death_ref_index")
    private Integer birthRefIndex;

    private Integer change;

    @Column(name = "private")
    @Convert(converter = NumericBooleanConverter.class)
    private Boolean isPrivate;

    // generate getters and setters




}