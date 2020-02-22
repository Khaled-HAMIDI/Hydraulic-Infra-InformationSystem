package dz.ade.pfe.web.commons.communes.mapper;

import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.web.commons.communes.dto.CommuneListDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunesMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    CommuneListDto communeToCommuneListDto(Commune commune);

    List<CommuneListDto> communeToCommuneListDto(List<Commune> commune);
}
