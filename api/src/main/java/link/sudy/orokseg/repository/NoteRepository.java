package link.sudy.orokseg.repository;

import java.util.Optional;
import link.sudy.orokseg.repository.model.DBNote;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository
    extends CrudRepository<DBNote, String>, PagingAndSortingRepository<DBNote, String> {

  @Query("SELECT n FROM note n WHERE n.grampsId = :grampsId")
  public Optional<DBNote> findByGrampsId(String grampsId);
}
