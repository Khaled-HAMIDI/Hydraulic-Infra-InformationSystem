package dz.ade.pfe.service.site.updatesite;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.site.UpdateSiteCommand;
import dz.ade.pfe.port.out.site.LoadSiteById;
import dz.ade.pfe.port.out.site.SaveSite;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UpdateServiceService implements UpdateSiteCommand {
    private final SiteUpdateMapper siteUpdateMapper;
    private final SaveSite saveSite;
    private final LoadSiteById loadSiteById;
    @Override
    public boolean updateSite(SiteDto siteDto) {
        Optional<Site> site = loadSiteById.loadSiteId(siteDto.getId());
        if (!site.isPresent()) {
            throw new ResourceNotFoundException(String.format("No site found with id '%s'.", siteDto.getId()));
        }
        Site site1 = site.get();
        siteUpdateMapper.SiteDtoMapper(siteDto ,site1);
        saveSite.saveSite(site1);
        return true;
    }
}
