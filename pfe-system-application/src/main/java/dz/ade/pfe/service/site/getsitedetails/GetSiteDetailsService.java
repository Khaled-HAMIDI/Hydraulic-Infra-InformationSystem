package dz.ade.pfe.service.site.getsitedetails;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.site.GetSiteDetailsQuery;
import dz.ade.pfe.port.out.site.LoadSiteById;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetSiteDetailsService implements GetSiteDetailsQuery {
    private final SiteDetailsMapper siteDtoMapper;
    private final LoadSiteById loadSiteById;
    @Override
    public SiteDto getSite(String id) {
        Optional<Site> site = loadSiteById.loadSiteId(id);
        if (!site.isPresent()) {
            throw new ResourceNotFoundException(String.format("No site found with id '%s'.", id));
        }
        return siteDtoMapper.SiteMapper(site.get());
    }
}
