package dz.ade.pfe.port.in.site;

import dz.ade.pfe.service.site.createsite.SiteDto;

public interface CreateSiteCommand {
    SiteDto createSite(SiteDto site , String  codeUnit);
}
