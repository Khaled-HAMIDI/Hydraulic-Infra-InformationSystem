package dz.ade.pfe.port.in.site;

import dz.ade.pfe.service.site.getsitelist.SiteDto;

import java.util.List;

public interface GetSiteListQuery {
    List<SiteDto> getSiteList(String unitCode);
}
