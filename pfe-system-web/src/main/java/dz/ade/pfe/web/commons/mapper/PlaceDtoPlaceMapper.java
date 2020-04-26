package dz.ade.pfe.web.commons.mapper;

import dz.ade.pfe.domain.commons.*;
import dz.ade.pfe.web.commons.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface
PlaceDtoPlaceMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    CommuneDto communeToCommuneDto(Commune commune);

    List<CommuneDto> communeToCommuneDto(List<Commune> commune);

    @Mappings({
            @Mapping(source = "code", target = "id"),
    })
    WilayaDto wilayaToWilayaDto(Wilaya wilaya);

}
