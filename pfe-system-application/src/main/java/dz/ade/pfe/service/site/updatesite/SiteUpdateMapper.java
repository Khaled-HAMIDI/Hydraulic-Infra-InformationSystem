package dz.ade.pfe.service.site.updatesite;

import dz.ade.pfe.domain.ouvrage.Site;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SiteUpdateMapper {
    Site SiteDtoMapper (SiteDto site, @MappingTarget Site site1);
}
