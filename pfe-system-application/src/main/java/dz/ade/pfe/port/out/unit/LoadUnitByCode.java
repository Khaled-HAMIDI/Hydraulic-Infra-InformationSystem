package dz.ade.pfe.port.out.unit;

import dz.ade.pfe.domain.admin.Unit;

import java.util.Optional;

public interface LoadUnitByCode {
    Optional<Unit> loadUnitByCode(String code);
}
