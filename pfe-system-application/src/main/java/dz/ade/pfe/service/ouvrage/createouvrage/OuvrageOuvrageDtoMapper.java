package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface OuvrageOuvrageDtoMapper {

    Ouvrage ouvrageAddDtoToOuvrage(OuvrageAddDto ouvrageAddDto);

}
