package link.sudy.orokseg.repository;

import java.util.Optional;
import link.sudy.orokseg.repository.model.DBMedium;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MediaRepository
    extends CrudRepository<DBMedium, String>, PagingAndSortingRepository<DBMedium, String> {

  @Query("SELECT f FROM media f WHERE f.grampsId = :grampsId")
  public Optional<DBMedium> findByGrampsId(String grampsId);
}
