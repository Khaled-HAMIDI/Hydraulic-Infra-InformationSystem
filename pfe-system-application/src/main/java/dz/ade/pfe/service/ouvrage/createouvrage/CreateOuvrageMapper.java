package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;




@Mapper(componentModel = "spring")
public interface CreateOuvrageMapper {
    @Mappings({
            @Mapping(target = "site", ignore = true),
            @Mapping(target = "commune", ignore = true)
    })
    Ouvrage ouvrageAddToOuvrage(OuvrageAddDto ouvrageAddDto);

    OuvrageCreatedDto ouvrageToOuvrageCreatedDto(Ouvrage ouvrage);

}
