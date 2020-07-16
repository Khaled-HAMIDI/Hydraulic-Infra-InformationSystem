package dz.ade.pfe.service.site.getsitedetails;

import dz.ade.pfe.domain.ouvrage.Site;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SiteDetailsMapper {
    SiteDto SiteMapper(Site site);
}
