package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

public interface ChainDetailsMapper {
    ChainDto chainToChainDto(Chain chain);
}
