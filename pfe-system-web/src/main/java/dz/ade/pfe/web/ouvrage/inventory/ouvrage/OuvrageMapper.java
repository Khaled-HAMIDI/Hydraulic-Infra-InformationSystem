package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface OuvrageMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    OuvrageDto ouvrageToOuvrageDto(Ouvrage ouvrage);
}
