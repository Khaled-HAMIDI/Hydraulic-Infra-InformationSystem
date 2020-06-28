package dz.ade.pfe.service.ouvrage.getouvragesynoptic;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.Cycle;
import dz.ade.pfe.domain.ouvrage.CycleOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", uses = SiteSynopticMapper.class)
public interface OuvrageSynopticMapper {
    @Mappings({
            @Mapping(target = "nbApears", expression = "java(getNbChains(ouvrage))"),
            @Mapping(target = "currentDebit", expression = "java(getCapacity(ouvrage))"),
            @Mapping(target = "enabled", expression = "java(getStat(ouvrage))")
    })
    OuvrageSynopticDto ouvrageToOuvrageDto(Ouvrage ouvrage);

    List<OuvrageSynopticDto> ouvrageToOuvrageDto(List<Ouvrage> ouvrages);

    default Integer getNbChains(Ouvrage ouvrage) {
        if (ouvrage.getChains() != null)
            return ouvrage.getChains().size();
        return 0;
    }

    default Double getCapacity(Ouvrage ouvrage) {
        if (ouvrage.getReadings().size() > 0)
            return ouvrage.getReadings().get(0).getDebit();
        else
            return null;
    }

    default Boolean getStat(Ouvrage ouvrage) {
        if (ouvrage.getCycles().size() > 0) {
            for (CycleOuvrage cycle : ouvrage.getCycles())
                if (LocalDate.now().compareTo(cycle.getStart()) >= 0 && (LocalDate.now().compareTo(cycle.getStop()) <= 0)) {
                    return false;
                }
            return true;
        } else
            return true;
    }
}
