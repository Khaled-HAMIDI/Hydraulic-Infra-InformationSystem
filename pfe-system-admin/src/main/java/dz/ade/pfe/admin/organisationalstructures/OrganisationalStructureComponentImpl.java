package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.*;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@Component
class OrganisationalStructureComponentImpl implements OrganisationalStructureComponent {

    private AgencyRepository agencyRepository;
    private CenterRepository centerRepository;
    private UnitRepository unitRepository;
    private OrganisationalStructureRepository organisationalStructureRepository;
    private JooqOrganisationalStructureRepository jooqOrganisationalStructureRepository;

    public OrganisationalStructureComponentImpl(AgencyRepository agencyRepository,
                                                CenterRepository centerRepository,
                                                UnitRepository unitRepository,
                                                OrganisationalStructureRepository organisationalStructureRepository,
                                                JooqOrganisationalStructureRepository jooqOrganisationalStructureRepository) {
        this.agencyRepository = agencyRepository;
        this.centerRepository = centerRepository;
        this.unitRepository = unitRepository;
        this.organisationalStructureRepository = organisationalStructureRepository;
        this.jooqOrganisationalStructureRepository = jooqOrganisationalStructureRepository;
    }

    @Override
    public List<Center> getCenters() {
        return centerRepository.findAllByDeleted(false);
    }

    @Override
    public Center createCenter(Center center) {
        return centerRepository.save(center);
    }

    @Override
    public Center updateCenter(Center center) {
        return centerRepository.save(center);
    }

    @Override
    public Agency createAgency(Agency agency) {
        return agencyRepository.save(agency);
    }

    @Override
    public Agency updateAgency(Agency agency) {
        return agencyRepository.save(agency);
    }

    @Override
    public Optional<Center> getCenter(String code) {
        return centerRepository.findOneByDeletedAndCode(false, code);
    }

    @Override
    public Optional<Center> findNotDeletedCenterByCode(String code) {
        return centerRepository.findByCodeAndDeleted(code, false);
    }

    @Override
    public Optional<Agency> findNotDeletedAgencyByCode(String code) {
        return agencyRepository.findByCodeAndDeleted(code, false);
    }

    @Override
    public List<Agency> getAgencies() {
        return agencyRepository.findAllByDeleted(false);
    }


    @Override
    public Optional<Agency> getAgency(String code) {
        return agencyRepository.findOneByDeletedAndCode(false, code);
    }

    @Override
    public Optional<OrganisationalStructure> getStructure(String code) {
        return organisationalStructureRepository.findOneByDeletedAndCode(false, code);
    }

    @Override
    public Optional<OrganisationalStructure> getUserOrganisationalStructure(String username) {
        return organisationalStructureRepository.findUserOrganisationalStructure(username);
    }

    @Override
    public Optional<Unit> getUnitByCenterCode(String code) {
        return unitRepository.getUnitByCenterCode(code);
    }

    @Override
    public Optional<Center> getCenterByAgencyCode(String code) {
        return centerRepository.getCenterByAgencyCode(code);
    }

    @Override
    public Optional<Unit> getUnitByCode(String code) {
        return unitRepository.findOneByDeletedAndCode(false, code);
    }

    @Override
    public int deleteAgencies(List<String> agencies) {
        return agencyRepository.delete(agencies);
    }

    @Override
    public int deleteCenters(List<String> centers) {
        return centerRepository.delete(centers);
    }

    @Override
    public List<Agency> getAgenciesByCenter(String code) {
        return agencyRepository.findAgenciesByCenter_Code(code);
    }

    @Override
    public List<Agency> getAgenciesByStructureCode(String code, StructureType structureType) {
        List<Agency> agencies = null;
        switch (structureType) {
            case UNIT:
                agencies = agencyRepository.findAllByDeletedAndCenterUnitCode(false, code);
                break;
            case CENTER:
                agencies = agencyRepository.findAllByDeletedAndCenterCode(false, code);
                break;
            case AGENCY:
                Optional<Agency> agency = agencyRepository.findOneByDeletedAndCode(false, code);
                agencies = agency.map(Collections::singletonList).orElseGet(ArrayList::new);
                break;
        }

        return agencies;
    }

    @Override
    public int detachHeadsOfOrganisationalStructure(List<String> usernames) {
        return jooqOrganisationalStructureRepository.detachHeadsOfOrganisationalStructure(usernames);
    }

    @Override
    public void setDeployedUnit(String code) {
        unitRepository.undeployAllUnits();
        unitRepository.setDeployedUnit(code);
    }

    @Override
    public Unit updateUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    @Override
    public Optional<Agency> getAgencyWithParentStructures(String code) {
        return agencyRepository.getAgencyWithParentStructures(code);
    }

    @Override
    public Agency getAgencyWithCenterAndUnite(String code) {
        ResourceNotFoundException resourceNotFoundExceptionSupplier = new ResourceNotFoundException(String.format("Resource with {ID %s} not found", code));

        return agencyRepository.getAgencyWithCenterAndUnite(code).orElseThrow(() -> resourceNotFoundExceptionSupplier);
    }
}
