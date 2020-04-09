package dz.ade.pfe.web.admin.user.mapper;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.web.admin.user.dto.StructureDto;
import dz.ade.pfe.web.admin.user.dto.StructureTokenDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface OrganisationalStructureDtoMapper {

    @Mappings({
            @Mapping(target = "id", source = "code"),
            @Mapping(source = "structureType", target = "type")
    })
    StructureDto organisationalStructureToOrganisationalStructureDto(OrganisationalStructure organisationalStructure);

    @Mappings({
            @Mapping(target = "id", source = "code"),
            @Mapping(source = "structureType", target = "type")
    })
    StructureTokenDto structToOrganisationalTokenDto(OrganisationalStructure organisationalStructure);
}
