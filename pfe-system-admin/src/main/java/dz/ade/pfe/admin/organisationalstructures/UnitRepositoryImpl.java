package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

interface UnitRepositoryImpl extends UnitRepository, JpaRepository<Unit, Long> {

    Optional<Unit> findOneByDeletedAndCode(Boolean deleted, String code);

    @Query(value = "SELECT c.unit FROM Center c WHERE c.code = :code")
    Optional<Unit> getUnitByCenterCode(@Param("code") String code);

    @Query(value = "UPDATE Unit u SET u.isDeployed = true WHERE u.code = :code")
    @Transactional
    @Modifying
    void setDeployedUnit(@Param("code") String code);

    @Query(value = "UPDATE Unit u SET u.isDeployed = false")
    @Transactional
    @Modifying
    void undeployAllUnits();
}
