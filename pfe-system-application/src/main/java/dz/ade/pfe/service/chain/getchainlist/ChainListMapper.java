package dz.ade.pfe.service.chain.getchainlist;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChainListMapper {
    @Mappings({
            @Mapping(target = "ouvragesNumber",expression = "java(getOuvragesNumber(chain))")
    })
    ChainListDto chainToChainListDto(Chain chain);
    List<ChainListDto> chainToChainListDto(List<Chain> chain);

    default Integer getOuvragesNumber(Chain chain){
        if(chain.getOuvrages() != null)
        return chain.getOuvrages().size();
        return 0;
    }

}
