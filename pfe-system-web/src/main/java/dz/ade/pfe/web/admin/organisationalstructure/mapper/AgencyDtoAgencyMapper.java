package dz.ade.pfe.web.admin.organisationalstructure.mapper;

import dz.ade.pfe.domain.admin.Agency;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.organisationalstructure.dto.AgencyCreateDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.AgencyDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.AgencyShowDto;
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
public interface AgencyDtoAgencyMapper {

    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "headOfTheStructure.username", target = "headOfTheStructure.id"),
            @Mapping(source = "center.code", target = "center.id"),
            @Mapping(source = "agencyType.value", target = "agencyType.designation"),
            @Mapping(source = "agencyType", target = "agencyType.id"),
            @Mapping(source = "agencyType", target = "agencyType.code")
    })
    AgencyShowDto agencyToAgencyShowDto(Agency agency);

    @Mappings({
            @Mapping(source = "center", target = "center.code"),
            @Mapping(target = "headOfTheStructure", ignore = true),
            @Mapping(target = "id", ignore = true)
    })
    Agency agencyDtoToAgency(AgencyDto agencyDto);

    @Mappings({
            @Mapping(source = "center", target = "center.code"),
            @Mapping(target = "id", ignore = true)
    })
    Agency agencyCreateDtoToAgency(AgencyCreateDto agencyCreateDto);

    @Mappings({
            @Mapping(target = "headOfTheStructure", ignore = true),
            @Mapping(target = "center", ignore = true),
            @Mapping(target = "id", ignore = true)
    })
    void agencyDtoToAgencyWithTarget(AgencyDto agencyDto, @MappingTarget Agency agency);

    @Mappings({
            @Mapping(source = "code", target = "id"),
            @Mapping(source = "center.designation", target = "center"),
            @Mapping(source = "agencyType.value", target = "agencyType")
    })
    AgencyDto agencyToAgencyDto(Agency agency);

    default String headOfTheStructureToString(User headOfTheStructure) {
        return headOfTheStructure == null ? "" : headOfTheStructure.getFirstName() + headOfTheStructure.getLastName();
    }
}
