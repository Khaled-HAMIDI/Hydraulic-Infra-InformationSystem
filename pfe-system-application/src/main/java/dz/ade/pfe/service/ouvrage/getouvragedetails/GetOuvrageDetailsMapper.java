package dz.ade.pfe.service.ouvrage.getouvragedetails;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageShowDto;
import dz.ade.pfe.service.ouvrage.getouvragelist.OuvrageListDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface GetOuvrageDetailsMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    OuvrageDto ouvrageToOuvrageDto(Ouvrage ouvrage);


}
