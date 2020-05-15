package dz.ade.pfe.service.chain.getchainsynoptic;

import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OuvrageChainSynMapper {

    @Mappings({
            @Mapping(source = "ouvrage.code", target = "code"),
            @Mapping(source = "ouvrage.name", target = "name"),
            @Mapping(source = "ouvrage.site.name", target = "site")
    })
    OuvrageDto OuvrageChaineMapper (OuvrageChain ouvrageChain);
    List<OuvrageDto> OuvrageChaineMapper (List<OuvrageChain> ouvrageChain);
}
