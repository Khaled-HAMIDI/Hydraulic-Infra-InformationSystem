package dz.ade.pfe.service.inventory.getouvragebyinventory;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.getouvragelist.OuvrageListDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface GetOuvrageByInventoryMapper {


    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    OuvrageInventoryDto ouvrageToOuvrageDto(Ouvrage ouvrage);

    List<OuvrageInventoryDto> ouvrageToOuvrageInventoryDto(List<Ouvrage> ouvrage);

}
