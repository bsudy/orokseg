package link.sudy.orokseg.repository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DBMedium {

  @Id
  @Setter(AccessLevel.PROTECTED)
  private String handle;

  @Column(name = "blob_data")
  private byte[] blobData;

  @Column(name = "gramps_id")
  private String grampsId;

  private String path;

  private String mime;

  @Column(name = "desc")
  private String description;

  private String checksum;

  private Integer change;

  @Column(name = "private")
  private Integer isPrivate;
}
