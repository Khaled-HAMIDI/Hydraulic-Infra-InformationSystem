package dz.ade.pfe.port.in.chain.getchainsynoptic;

import dz.ade.pfe.service.chain.getchainsynoptic.ChainSynopticDto;

import java.util.List;

public interface GetChainSynopticQuery {
    List<ChainSynopticDto> getChainSynoptic(String code);
}
