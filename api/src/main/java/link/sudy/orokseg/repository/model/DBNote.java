package link.sudy.orokseg.repository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.With;

@Entity(name = "note")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@With
public class DBNote {

  @Id
  @Column(name = "handle", nullable = false, length = 50)
  private String handle;

  @Column(name = "blob_data")
  private byte[] blobData;

  @Column(name = "gramps_id")
  private String grampsId;

  @Column(name = "format")
  private Integer format;

  @Column(name = "change")
  private Integer change;

  @Column(name = "private")
  private Integer privateField;
}
