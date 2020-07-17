package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageCommand;
import dz.ade.pfe.port.out.commune.LoadCommuneById;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import dz.ade.pfe.port.out.site.LoadSiteById;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageCommand {
    //@Autowired
    private final SaveOuvrage saveOuvrage;
    private final LoadSiteById loadSiteById;
    private final LoadUnitByCode loadUnitByCode;
    private final LoadCommuneById loadCommuneById;
    private final CreateOuvrageMapper createOuvrageMapper;

    @Override
    public OuvrageShowDto createOuvrage(OuvrageAddDto ouvrageAddDto, String unitCode) {

        Ouvrage ouvrage =createOuvrageMapper.ouvrageAddToOuvrage(ouvrageAddDto);

        Optional<Commune> commune = loadCommuneById.loadCommuneByCode(ouvrageAddDto.getCommune());
        if (!commune.isPresent()) {
            throw new ResourceNotFoundException(String.format("No commune found with code '%s'.", unitCode));
        }
        ouvrage.setCommune(commune.get());

        Optional<OrganisationalStructure> unit = loadUnitByCode.loadUnitByCode(unitCode);
        if (!unit.isPresent()) {
            throw new ResourceNotFoundException(String.format("No unit found with code '%s'.", unitCode));
        }
        ouvrage.setUnit(unit.get());

        Optional<Site> site = loadSiteById.loadSiteId(ouvrageAddDto.getSite());
        if (!site.isPresent()) {
            throw new ResourceNotFoundException(String.format("No site found with id '%s'.", ouvrageAddDto.getSite()));
        }
        ouvrage.setSite(site.get());
        ouvrage.setDeclassed(false);
        return createOuvrageMapper.ouvrageToOuvrageDto(saveOuvrage.saveOuvrage(ouvrage));
    }

    @Override
    public Boolean deleteOuvrage(String code) {
         saveOuvrage.deleteOuvrage(code);
         return true;
    }
}

