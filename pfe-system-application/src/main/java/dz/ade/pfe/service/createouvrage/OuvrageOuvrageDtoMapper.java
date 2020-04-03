package dz.ade.pfe.service.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface OuvrageOuvrageDtoMapper {

    Ouvrage ouvrageAddDtoToOuvrage(OuvrageAddDto ouvrageAddDto);

}
