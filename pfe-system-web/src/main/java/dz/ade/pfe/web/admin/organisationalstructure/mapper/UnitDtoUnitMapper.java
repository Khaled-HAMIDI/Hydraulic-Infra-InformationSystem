package dz.ade.pfe.web.admin.organisationalstructure.mapper;

import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.web.admin.organisationalstructure.dto.UnitDto;
import dz.ade.pfe.web.admin.organisationalstructure.dto.UnitEditDto;
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
public interface UnitDtoUnitMapper {

    @Mappings({@Mapping(source = "code", target = "id"),
               @Mapping(source = "headOfTheStructure.username", target = "headOfTheStructure.id")
    })
	UnitDto unitToUnitDto(Unit unit);

    @Mappings({
            @Mapping(target = "headOfTheStructure", ignore = true),
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "code", ignore = true)
    })
    void unitEditDtoToUnitWithTarget(UnitEditDto unitEditDto, @MappingTarget Unit unit);
}
