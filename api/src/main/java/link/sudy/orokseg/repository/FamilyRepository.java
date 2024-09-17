package link.sudy.orokseg.repository;

import java.util.Optional;
import link.sudy.orokseg.repository.model.DBFamily;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository
    extends CrudRepository<DBFamily, String>, PagingAndSortingRepository<DBFamily, String> {

  @Query("SELECT f FROM family f WHERE f.grampsId = :grampsId")
  public Optional<DBFamily> findByGrampsId(String grampsId);
}
