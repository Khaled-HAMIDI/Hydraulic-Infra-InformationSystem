package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ChainDetailsMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    ChainDto chainToChainDto(Chain chain);
}
