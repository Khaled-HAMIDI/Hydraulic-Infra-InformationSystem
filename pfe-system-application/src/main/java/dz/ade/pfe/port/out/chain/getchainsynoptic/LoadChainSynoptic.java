package dz.ade.pfe.port.out.chain.getchainsynoptic;

import dz.ade.pfe.domain.ouvrage.Chain;

import java.util.List;
import java.util.Optional;

public interface LoadChainSynoptic {
    List<Chain> loadChainSynoptic(String code);
}
