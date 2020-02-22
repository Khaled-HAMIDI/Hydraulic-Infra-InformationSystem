package dz.ade.pfe.web.commons.street.mapper;

import dz.ade.pfe.domain.commons.Street;
import dz.ade.pfe.web.commons.street.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(componentModel = "spring")
public interface StreetDtoStreetMapper {

    @Mappings({
            @Mapping(source = "code", target = "id")
    })
    StreetDto streetToStreetDto(Street street);

    List<StreetDto> streetToStreetDto(List<Street> street);

    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "district.designation", target = "district"),
    })
    StreetListDto streetToStreetListDto(Street street);

    List<StreetListDto> streetToStreetListDto(List<Street> streets);


    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "district.code", target = "district.id"),
    })
    StreetShowDto streetToStreetShowDto(Street street);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(source = "district", target = "district.code"),
    })
    Street streetAddDtoToStreet(StreetAddDto streetAddDto);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "district", ignore = true),
    })
    void streetEditDtoToStreetWithTarget(StreetEditDto streetEditDto, @MappingTarget Street street);

}
