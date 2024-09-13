package link.sudy.orokseg.repository;

import java.util.Optional;
import link.sudy.orokseg.repository.model.DBPerson;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository
        extends CrudRepository<DBPerson, String>, PagingAndSortingRepository<DBPerson, String> {
    
    @Query("SELECT p FROM person p WHERE p.grampsId = :grampsId")
    Optional<DBPerson> findByGrampsId(String grampsId);
}
