package dz.ade.pfe.service.ouvrage.getouvragelist;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface GetOuvrageListMapper {


    @Mappings({
            @Mapping(target = "nbApears", expression = "java(getNbChains(ouvrage))"),
            @Mapping(source = "code", target = "id")
    })
    OuvrageListDto ouvrageToOuvrageDto(Ouvrage ouvrage);

    List<OuvrageListDto> ouvrageToOuvrageListDto(List<Ouvrage> ouvrage);

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    DeclassedDto ouvrageToDeclassedDto(Ouvrage ouvrage);

    List<DeclassedDto> ouvrageToDeclassedListDto(List<Ouvrage> ouvrage);

    default Integer getNbChains(Ouvrage ouvrage) {
        if (ouvrage.getChains() != null)
            return ouvrage.getChains().size();
        return 0;
    }

}
