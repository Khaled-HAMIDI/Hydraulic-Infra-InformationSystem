package dz.ade.pfe.port.in.chain.updatechain;

import dz.ade.pfe.service.chain.getchaindetails.ChainDto;
import dz.ade.pfe.service.chain.updatechain.UpdateChainDto;

public interface UpdateChainQuery {
    ChainDto updateChain(UpdateChainDto chain);
}
