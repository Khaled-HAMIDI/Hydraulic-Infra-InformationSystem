package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.Unit;

import java.util.List;
import java.util.Optional;

interface UnitRepository {

    List<Unit> findAll();

    Optional<Unit> findOneByDeletedAndCode(Boolean deleted, String code);

    Unit save(Unit unit);

    Optional<Unit> getUnitByCenterCode(String code);

    void setDeployedUnit(String code);

    void undeployAllUnits();
}
