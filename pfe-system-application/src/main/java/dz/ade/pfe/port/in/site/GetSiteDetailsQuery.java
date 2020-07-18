package dz.ade.pfe.port.in.site;


import dz.ade.pfe.service.site.getsitedetails.SiteDto;

public interface GetSiteDetailsQuery {
    SiteDto getSite(String id);
}
