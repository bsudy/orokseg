package link.sudy.orokseg.repository;

import link.sudy.orokseg.repository.model.DBPerson;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends CrudRepository<DBPerson, String> {
}
