package link.sudy.orokseg.repository;

import link.sudy.orokseg.repository.model.DBFamily;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends CrudRepository<DBFamily, String> {
}
