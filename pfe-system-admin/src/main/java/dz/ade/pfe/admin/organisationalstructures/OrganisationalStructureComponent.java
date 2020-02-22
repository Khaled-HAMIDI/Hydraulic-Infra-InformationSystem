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

    List<Agency> getAgencies();

    Center createCenter(Center center);

    Center updateCenter(Center center);

    Agency createAgency(Agency agency);

    Agency updateAgency(Agency agency);

    List<Center> getCenters();

    Optional<Agency> getAgency(String code);

    Optional<Center> getCenter(String code);

    Optional<Center> findNotDeletedCenterByCode(String code);

    Optional<Agency> findNotDeletedAgencyByCode(String code);

    int deleteAgencies(List<String> agencies);

    Optional<Unit> getUnitByCode(String code);

    Optional<OrganisationalStructure> getStructure(String code);

    Optional<OrganisationalStructure> getUserOrganisationalStructure(String username);

    Optional<Unit> getUnitByCenterCode(String code);

    Optional<Center> getCenterByAgencyCode(String code);

    int deleteCenters(List<String> centers);

    List<Agency> getAgenciesByCenter(String code);

    List<Agency> getAgenciesByStructureCode(String code, StructureType structureType);

    int detachHeadsOfOrganisationalStructure(List<String> usernames);

    void setDeployedUnit(String code);

    Unit updateUnit(Unit unit);

    Optional<Agency> getAgencyWithParentStructures(String code);

    Agency getAgencyWithCenterAndUnite(String code);


}
