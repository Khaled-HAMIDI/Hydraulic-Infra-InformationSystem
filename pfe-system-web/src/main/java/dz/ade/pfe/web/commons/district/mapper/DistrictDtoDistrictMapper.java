package dz.ade.pfe.web.commons.district.mapper;

import dz.ade.pfe.domain.commons.*;
import dz.ade.pfe.web.commons.district.dto.*;
import dz.ade.pfe.web.commons.street.dto.StreetDistrictListDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring", uses = {StreetDistrictDtoStreetMapper.class})
public interface DistrictDtoDistrictMapper {

    @Mappings({
            @Mapping(source = "code", target = "id"),
    })
    DistrictDto districtToDistrictDto(District district);

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    DistrictTourDto districtToDistrictTourDto(District district);

    List<DistrictTourDto> districtToDistrictTourDto(List<District> districts);

    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "agency.designation", target = "agency"),
    })
    DistrictListDto districtToDistrictListDto(District district);

    List<DistrictListDto> districtToDistrictListDto(List<District> districts);


    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "agency.code", target = "agency.id"),
    })
    DistrictShowDto districtToDistrictShowDto(District district);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(source = "agency", target = "agency.code"),
    })
    District districtAddDtoToDistrict(DistrictAddDto districtAddDto);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "agency", ignore = true),
    })
    void districtEditDtoToDistrictWithTarget(DistrictEditDto districtEditDto, @MappingTarget District district);

    @Mappings({
            @Mapping(source = "code", target = "id"),
    })
    StreetDistrictListDto districtToStreetDistrictListDto(District district);

    List<StreetDistrictListDto> districtToStreetDistrictListDto(List<District> districts);
}
