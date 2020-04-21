package dz.ade.pfe.service.ouvrage.getouvragesynoptic;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;

import java.util.List;
@Mapper(componentModel = "spring")
public interface OuvrageSynopticMapper {
    OuvrageSynopticDto ouvrageToOuvrageDto (Ouvrage ouvrage);
    List<OuvrageSynopticDto> ouvrageToOuvrageDto(List<Ouvrage> ouvrages);
}
