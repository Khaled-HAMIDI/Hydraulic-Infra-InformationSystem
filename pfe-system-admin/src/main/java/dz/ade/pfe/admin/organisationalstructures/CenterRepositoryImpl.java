package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

interface CenterRepositoryImpl extends CenterRepository, JpaRepository<Center, Long> {

    Optional<Center> findOneByDeletedAndCode(Boolean deleted, String code);

    Optional<Center> findByCodeAndDeleted(String code, Boolean deleted);

    List<Center> findAllByDeleted(Boolean deleted);

    @Transactional
    @Modifying
    @Query(value= "UPDATE Center SET deleted = true, deletedDate = CURRENT_TIMESTAMP WHERE code IN ?1 AND deleted = false")
    int delete(List<String> centers);

}
