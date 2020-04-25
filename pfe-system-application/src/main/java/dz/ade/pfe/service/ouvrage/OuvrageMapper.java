package dz.ade.pfe.service.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageShowDto;
import dz.ade.pfe.service.ouvrage.getouvragedetails.OuvrageDto;
import dz.ade.pfe.service.ouvrage.getouvragelist.OuvrageListDto;
import dz.ade.pfe.service.ouvrage.updateouvrage.OuvrageUpdateDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface OuvrageMapper {

    OuvrageShowDto ouvrageToOuvrageShow(Ouvrage ouvrage);

    Ouvrage ouvrageAddToOuvrage(OuvrageAddDto ouvrageAddDto);

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    OuvrageDto ouvrageToOuvrageDto(Ouvrage ouvrage);

    OuvrageListDto ouvrageToOuvrageListDto(Ouvrage ouvrage);

    List<OuvrageListDto> ouvrageToOuvrageListDto(List<Ouvrage> ouvrage);





}
