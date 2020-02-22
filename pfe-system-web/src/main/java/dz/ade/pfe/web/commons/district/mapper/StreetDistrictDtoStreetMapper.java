package dz.ade.pfe.web.commons.district.mapper;

import dz.ade.pfe.domain.commons.Street;
import dz.ade.pfe.web.commons.district.dto.StreetDistrictDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PlaceOfConsumptionDistrictDtoPlaceOfConsumptionMapper.class})
public interface StreetDistrictDtoStreetMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    StreetDistrictDto streetToStreetDistrictDto(Street street);

    List<StreetDistrictDto> streetToStreetDistrictDto(List<Street> streets);
}