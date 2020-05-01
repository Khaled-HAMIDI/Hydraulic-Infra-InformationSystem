package dz.ade.pfe.service.site.getsitelist;

import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.site.GetSiteListQuery;
import dz.ade.pfe.port.out.site.LoadSiteList;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetSiteListService implements GetSiteListQuery {
    private final LoadUnitByCode loadUnitByCode;
    private final SiteListMapper siteListMapper;
    private final LoadSiteList loadSiteList;
    @Override
    public List<SiteDto> getSiteList(String unitCode) {
        Optional<Unit> unit = loadUnitByCode.loadUnitByCode(unitCode);
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("No unit found with code '%s'.", unitCode));
        }
        List<Site> sites = loadSiteList.loadSiteList(unit.get().getCode());
        return siteListMapper.SiteMapper(sites);
    }
}
