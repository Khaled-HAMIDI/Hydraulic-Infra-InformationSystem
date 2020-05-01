package dz.ade.pfe.service.site.createsite;

import dz.ade.pfe.domain.ouvrage.Site;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SiteDtoMapper {

    SiteDto SiteMapper(Site site);
}
