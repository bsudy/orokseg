package link.sudy.orokseg.repository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "family")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DBFamily {
    @Id
    @Setter(AccessLevel.PROTECTED)
    private String handle;
    @Column(name = "blob_data")
    private byte[] blobData;
    @Column(name = "gramps_id")
    private String grampsId;
    @Column(name = "father_handle")
    private String fatherHandle;
    @Column(name = "mother_handle")
    private String motherHandle;
    private Integer change;
    @Column(name = "private")
    private Integer isPrivate;
}
