package dz.ade.pfe.port.out.site;

import dz.ade.pfe.domain.ouvrage.Site;

import java.util.List;

public interface LoadSiteList {
    List<Site> loadSiteList(String unitCode);
}
