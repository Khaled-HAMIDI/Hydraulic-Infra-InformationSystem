package dz.ade.pfe.service.ouvrage.getouvragelist;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface GetOuvrageListMapper {


    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    OuvrageListDto ouvrageToOuvrageDto(Ouvrage ouvrage);

    List<OuvrageListDto> ouvrageToOuvrageListDto(List<Ouvrage> ouvrage);

}
