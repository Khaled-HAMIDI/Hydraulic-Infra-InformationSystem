package dz.ade.pfe.service.ouvrage.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UpdateOuvrageMapper {

    OuvrageUpdateDto ouvrageToOuvrageUpdate(Ouvrage ouvrage);
}
