package dz.ade.pfe.port.in.site;

import dz.ade.pfe.service.site.createsite.SiteDto;

public interface CreateSiteQuery {
    SiteDto createSite(SiteDto site , String  codeUnit);
}
