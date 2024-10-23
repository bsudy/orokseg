package link.sudy.orokseg.repository;

import java.util.Optional;
import link.sudy.orokseg.repository.model.DBEvent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository
    extends CrudRepository<DBEvent, String>, PagingAndSortingRepository<DBEvent, String> {

  @Query("SELECT f FROM event f WHERE f.grampsId = :grampsId")
  public Optional<DBEvent> findByGrampsId(String grampsId);
}
