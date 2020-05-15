package dz.ade.pfe.service.chain.getchainsynoptic;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring", uses = OuvrageChainSynMapper.class)
public interface ChainSynopticMapper {
    ChainSynopticDto chainToChainDto(Chain chain);
    List<ChainSynopticDto> chainToChainListDto(List<Chain> chain);
}
