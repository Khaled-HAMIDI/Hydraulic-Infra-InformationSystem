package dz.ade.pfe.service.ouvrage.getouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;



@Mapper(componentModel = "spring")
public interface GetOuvrageMapper {

    OuvrageShowDto ouvrageToOuvrageShow(Ouvrage ouvrage);

}
