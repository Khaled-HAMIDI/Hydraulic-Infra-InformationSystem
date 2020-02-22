package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
interface AgencyRepositoryImpl extends AgencyRepository, JpaRepository<Agency, Long> {

    Optional<Agency> findOneByDeletedAndCode(Boolean deleted, String code);

    Optional<Agency> findByCodeAndDeleted(String code, Boolean deleted);

    List<Agency> findAllByDeletedAndCenterCode(Boolean deleted, String code);

    List<Agency> findAllByDeletedAndCenterUnitCode(Boolean deleted, String code);

    @Transactional
    @Modifying
    @Query(value= "UPDATE Agency SET deleted = true, deletedDate = CURRENT_TIMESTAMP WHERE code IN ?1 AND deleted = false")
    int delete(List<String> Agencies);

    List<Agency> findAllByDeleted(Boolean deleted);

    List<Agency> findAgenciesByCenter_Code(String code);

    @Query(value= "SELECT a FROM Agency a LEFT JOIN FETCH a.center c LEFT JOIN FETCH c.unit where a.code= :code")
    Optional<Agency> getAgencyWithParentStructures(String code);

    @Query(value= "SELECT a FROM Agency a " +
            "INNER JOIN FETCH a.center c " +
            "INNER JOIN FETCH c.unit " +
            "WHERE a.code = :code")
    Optional<Agency> getAgencyWithCenterAndUnite(String code);
}
