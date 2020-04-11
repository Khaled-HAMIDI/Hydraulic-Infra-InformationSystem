package dz.ade.pfe.service.chain.getchainlist;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChainListMapper {
    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    ChainListDto chainToChainListDto(Chain chain);

    List<ChainListDto> chainToChainListDto(List<Chain> chain);

}
