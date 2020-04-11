package dz.ade.pfe.port.in.chain.createchain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.service.chain.createchain.ChainSaveDto;

public interface CreateChainQuery {
    Chain createChain(ChainSaveDto chain);
}
