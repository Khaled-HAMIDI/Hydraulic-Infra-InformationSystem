package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = OuvrageChainMapper.class)
public interface ChainDetailsMapper {
    ChainDto chainToChainDto(Chain chain);
}
