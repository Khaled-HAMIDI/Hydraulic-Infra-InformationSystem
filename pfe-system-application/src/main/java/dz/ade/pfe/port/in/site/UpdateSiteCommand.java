package dz.ade.pfe.port.in.site;


import dz.ade.pfe.service.site.updatesite.SiteDto;

public interface UpdateSiteCommand {
    boolean updateSite(SiteDto siteDto);
}
