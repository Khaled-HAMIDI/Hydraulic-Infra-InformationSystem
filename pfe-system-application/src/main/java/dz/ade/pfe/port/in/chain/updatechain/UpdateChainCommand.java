package dz.ade.pfe.port.in.chain.updatechain;

import dz.ade.pfe.service.chain.getchaindetails.ChainDto;
import dz.ade.pfe.service.chain.updatechain.UpdateChainDto;

public interface UpdateChainCommand {
    ChainDto updateChain(UpdateChainDto chain, String code);
}
