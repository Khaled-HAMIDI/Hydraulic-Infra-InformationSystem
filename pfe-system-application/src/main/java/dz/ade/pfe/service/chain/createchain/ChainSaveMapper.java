package dz.ade.pfe.service.chain.createchain;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ChainSaveMapper {
    @Mappings({
            @Mapping(target = "ouvrages", ignore = true)
    })
    Chain chainSaveToChain(ChainSaveDto chain);
}
