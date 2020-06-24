package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.*;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 7/22/2018
 */
public interface OrganisationalStructureComponent {

    Optional<Center> getCenter(String code);

    Center createCenter(Center center);

    Center updateCenter(Center center);

    List<Center> getCenters();

    List<Center> getUnitCenters(String code);

    List<Center> getCenters(String code);

    Optional<Center> findNotDeletedCenterByCode(String code);

    Optional<Unit> getUnitByCode(String code);

    Optional<OrganisationalStructure> getStructure(String code);

    Optional<OrganisationalStructure> getUserOrganisationalStructure(String username);

    Optional<Unit> getUnitByCenterCode(String code);

    int deleteCenters(List<String> centers);

    int detachHeadsOfOrganisationalStructure(List<String> usernames);

    void setDeployedUnit(String code);

    Unit updateUnit(Unit unit);
}
