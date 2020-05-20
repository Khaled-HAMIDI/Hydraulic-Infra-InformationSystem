package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import dz.ade.pfe.port.out.site.LoadSiteById;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import dz.ade.pfe.service.ouvrage.getouvragedetails.OuvrageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageQuery {
    //@Autowired
    private final SaveOuvrage saveOuvrage;
    private final LoadSiteById loadSiteById;
    private final LoadUnitByCode loadUnitByCode;
    private final CreateOuvrageMapper createOuvrageMapper;

    @Override
    public OuvrageDto createOuvrage(OuvrageAddDto ouvrageAddDto, String unitCode) {

        Ouvrage ouvrage =createOuvrageMapper.ouvrageAddToOuvrage(ouvrageAddDto);
        Optional<Unit> unit = loadUnitByCode.loadUnitByCode(unitCode);
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("No unit found with code '%s'.", unitCode));
        }
        ouvrage.setUnit(unit.get());
        Optional<Site> site = loadSiteById.loadSiteId(ouvrageAddDto.getSite());
        if (!site.isPresent()) {
            throw new ResourceNotFoundException(String.format("No site found with id '%s'.", ouvrageAddDto.getSite()));
        }
        ouvrage.setSite(site.get());
        return createOuvrageMapper.ouvrageToOuvrageDto(saveOuvrage.saveOuvrage(ouvrage));
    }
}

