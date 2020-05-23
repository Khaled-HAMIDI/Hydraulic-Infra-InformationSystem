package dz.ade.pfe.service.site.createsite;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.site.CreateSiteQuery;
import dz.ade.pfe.port.out.site.SaveSite;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateSiteService implements CreateSiteQuery {
    private final SaveSite saveSite;
    private final LoadUnitByCode loadUnitByCode;
    private final SiteDtoMapper siteDtoMapper;
    @Override
    public SiteDto createSite(SiteDto site, String unitCode) {
        Site site1 = new Site();
        site1.setName(site.getName());
        Optional<OrganisationalStructure> unit = loadUnitByCode.loadUnitByCode(unitCode);
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("No unit found with code '%s'.", unitCode));
        }
        site1.setUnit(unit.get());
        return siteDtoMapper.SiteMapper(saveSite.saveSite(site1));
    }
}
