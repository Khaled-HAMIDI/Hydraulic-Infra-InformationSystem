package dz.ade.pfe.port.out.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;

import java.util.Optional;

public interface LoadChainDetails {
    Optional<Chain> loadChainDetails(String code);
}
