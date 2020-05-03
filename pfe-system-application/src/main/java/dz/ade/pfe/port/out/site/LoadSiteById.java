package dz.ade.pfe.port.out.site;

import dz.ade.pfe.domain.ouvrage.Site;

import java.util.Optional;

public interface LoadSiteById {
    Optional<Site> loadSiteId(String id);
}
