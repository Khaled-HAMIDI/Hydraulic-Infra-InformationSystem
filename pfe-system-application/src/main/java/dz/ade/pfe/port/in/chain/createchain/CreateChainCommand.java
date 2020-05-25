package dz.ade.pfe.port.in.chain.createchain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.service.chain.createchain.ChainSaveDto;


public interface CreateChainCommand {
    Chain createChain(ChainSaveDto chain);
}
