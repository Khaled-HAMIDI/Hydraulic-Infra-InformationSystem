package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OuvrageChainMapper {
    @Mappings({
            @Mapping(source = "ouvrage.code", target = "code")
    })
    OuvrageDto OuvrageChaineMapper (OuvrageChain ouvrageChain);
    List<OuvrageDto> OuvrageChaineMapper (List<OuvrageChain> ouvrageChain);
}
