package dz.ade.pfe.port.out.getchainbycode;

import dz.ade.pfe.domain.ouvrage.Chain;

import java.util.Optional;

public interface LoadChainByCode {
    Optional <Chain> getChainByCode(String code);
}
