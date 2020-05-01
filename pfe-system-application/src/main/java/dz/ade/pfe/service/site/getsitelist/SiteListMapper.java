package dz.ade.pfe.service.site.getsitelist;

import dz.ade.pfe.domain.ouvrage.Site;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SiteListMapper {
    SiteDto SiteMapper(Site site);
    List<SiteDto> SiteMapper(List<Site> sites);
}
