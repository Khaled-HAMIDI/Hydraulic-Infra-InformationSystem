package dz.ade.pfe.ouvrage.inventory.site;

import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.out.site.LoadSiteList;
import dz.ade.pfe.port.out.site.SaveSite;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SitePersistenceAdapter implements SaveSite, LoadSiteList {
    private final SiteRepository siteRepository;

    @Override
    public Site saveSite(Site site) {
        return siteRepository.save(site);
    }

    @Override
    public List<Site> loadSiteList(String unitCode) {
        return siteRepository.findByUnitCode(unitCode);
    }
}
