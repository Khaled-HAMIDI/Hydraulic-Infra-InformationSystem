package dz.ade.pfe.service.ouvrage.getouvragelist;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.getouvragedetails.OuvrageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface GetOuvrageListMapper {


    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    OuvrageDto ouvrageToOuvrageDto(Ouvrage ouvrage);

    List<OuvrageListDto> ouvrageToOuvrageListDto(List<Ouvrage> ouvrage);

}
