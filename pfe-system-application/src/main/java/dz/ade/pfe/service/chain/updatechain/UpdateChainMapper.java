package dz.ade.pfe.service.chain.updatechain;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UpdateChainMapper {
    @Mapping(target = "ouvrages", ignore = true)
    Chain UpdateChainDtoToChain (UpdateChainDto chainDto, @MappingTarget Chain chain);
}
