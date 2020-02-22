package dz.ade.pfe.web.admin.organisationalstructure.mapper;

import dz.ade.pfe.domain.admin.Center;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterCreateDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.CenterShowDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@Mapper(componentModel = "spring")
public interface CenterDtoCenterMapper {

    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "headOfTheStructure.username", target = "headOfTheStructure.id")
    })
    CenterShowDto centerToCenterShowDto(Center center);

    @Mappings({
            @Mapping(target = "headOfTheStructure", ignore = true),
            @Mapping(target = "id", ignore = true)
    })
    Center centerDtoToCenter(CenterDto centerDto);

    @Mappings({
            @Mapping(target = "id", ignore = true)
    })
    Center centerCreateDtoToCenter(CenterCreateDto centerCreateDto);

    @Mappings({
            @Mapping(target = "headOfTheStructure", ignore = true),
            @Mapping(target = "id", ignore = true)
    })
    void centerDtoToCenterWithTarget(CenterDto centerDto, @MappingTarget Center center);

    @Mappings(@Mapping(source = "code", target = "id"))
    CenterDto centerToCenterDto(Center center);

    default String headOfTheStructureToString(User headOfTheStructure) {
        return headOfTheStructure == null ? "" : headOfTheStructure.getFirstName() + headOfTheStructure.getLastName();
    }
}
