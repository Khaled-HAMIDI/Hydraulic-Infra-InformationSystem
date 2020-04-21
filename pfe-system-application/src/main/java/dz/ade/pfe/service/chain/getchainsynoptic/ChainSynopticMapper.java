package dz.ade.pfe.service.chain.getchainsynoptic;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.service.chain.getchainlist.ChainListDto;

import java.util.List;

public interface ChainSynopticMapper {
    ChainSynopticDto chainToChainDto(Chain chain);
    List<ChainSynopticDto> chainToChainListDto(List<Chain> chain);
}
