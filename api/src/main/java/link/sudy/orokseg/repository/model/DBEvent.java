package link.sudy.orokseg.repository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity(name = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DBEvent {

  @Id
  @Column(name = "handle", length = 50, nullable = false)
  private String handle;

  @Column(name = "blob_data")
  private byte[] blobData;

  @Column(name = "gramps_id")
  private String grampsId;

  @Column(name = "description")
  private String description;

  @Column(name = "place", length = 50)
  private String place;

  @Column(name = "change")
  private Integer change;

  @Column(name = "private")
  private Integer privateField;
}
