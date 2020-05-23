package dz.ade.pfe.ouvrage.inventory.unit;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
@RequiredArgsConstructor
public class UnitPersistenceAdapter implements LoadUnitByCode {
    private final OrganisationalStructureComponent organisationalStructureComponent;
    @Override
    public Optional<OrganisationalStructure> loadUnitByCode(String code) {
        return organisationalStructureComponent.getStructure(code);
    }
}
