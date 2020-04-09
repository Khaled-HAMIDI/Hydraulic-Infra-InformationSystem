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

    private CenterRepository centerRepository;
    private UnitRepository unitRepository;
    private OrganisationalStructureRepository organisationalStructureRepository;
    private JooqOrganisationalStructureRepository jooqOrganisationalStructureRepository;

    public OrganisationalStructureComponentImpl(CenterRepository centerRepository,
                                                UnitRepository unitRepository,
                                                OrganisationalStructureRepository organisationalStructureRepository,
                                                JooqOrganisationalStructureRepository jooqOrganisationalStructureRepository) {
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
    public Optional<Center> getCenter(String code) {
        return centerRepository.findOneByDeletedAndCode(false, code);
    }

    @Override
    public Optional<Center> findNotDeletedCenterByCode(String code) {
        return centerRepository.findByCodeAndDeleted(code, false);
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
    public Optional<Unit> getUnitByCode(String code) {
        return unitRepository.findOneByDeletedAndCode(false, code);
    }

    @Override
    public int deleteCenters(List<String> centers) {
        return centerRepository.delete(centers);
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

}
