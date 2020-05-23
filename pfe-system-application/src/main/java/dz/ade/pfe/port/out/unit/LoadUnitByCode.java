package dz.ade.pfe.port.out.unit;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.Unit;

import java.util.Optional;

public interface LoadUnitByCode {
    Optional<OrganisationalStructure> loadUnitByCode(String code);
}
