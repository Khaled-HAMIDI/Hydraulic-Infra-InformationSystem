package dz.ade.pfe.service.ouvrage.getouvragesynoptic;

import dz.ade.pfe.domain.ouvrage.Site;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SiteSynopticMapper {
    SiteDto siteToSiteDto(Site site);
}
