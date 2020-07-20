package dz.ade.pfe.service.ouvrage.getouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface GetOuvrageMapper {

    @Mappings({
            @Mapping(target = "commune", source = "commune.designation"),
            @Mapping(target = "type", source = "type.value"),
            @Mapping(target = "form", source = "form.value"),
            @Mapping(target = "state", source = "state.value"),
            @Mapping(target = "process", source = "process.value"),
            @Mapping(target = "waterSource", source = "waterSource.value"),
            @Mapping(target = "tankType", source = "tankType.value"),
            @Mapping(target = "tankRole", source = "tankRole.value"),
            @Mapping(target = "treatmentStationType", source = "treatmentStationType.value")
    })
    OuvrageShowDto ouvrageToOuvrageShow(Ouvrage ouvrage);

}
