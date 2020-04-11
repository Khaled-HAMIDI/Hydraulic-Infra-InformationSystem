package dz.ade.pfe.port.out.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;

public interface LoadChainDetails {
    Chain loadChainDetails(String code);
}
