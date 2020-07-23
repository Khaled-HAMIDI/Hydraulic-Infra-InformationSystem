package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.OuvrageType;
import dz.ade.pfe.domain.ouvrage.Site;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageCommand;
import dz.ade.pfe.port.out.LoadSequelNumber;
import dz.ade.pfe.port.out.commune.LoadCommuneById;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import dz.ade.pfe.port.out.site.LoadSiteById;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageCommand {
    //@Autowired
    private final SaveOuvrage saveOuvrage;
    private final LoadSiteById loadSiteById;
    private final LoadUnitByCode loadUnitByCode;
    private final LoadCommuneById loadCommuneById;
    private final CreateOuvrageMapper createOuvrageMapper;
    private final LoadSequelNumber loadSequelNumber;

    @Override
    public OuvrageCreatedDto createOuvrage(OuvrageAddDto ouvrageAddDto, String organisationalStructureCode) {

        Ouvrage ouvrage = createOuvrageMapper.ouvrageAddToOuvrage(ouvrageAddDto);

        Commune commune = loadCommuneById.loadCommuneByCode(ouvrageAddDto.getCommune())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No commune found with code '%s'.", ouvrageAddDto.getCommune())));

        OrganisationalStructure organisationalStructure = loadUnitByCode.loadUnitByCode(organisationalStructureCode)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No organisational structure found with code '%s'.", organisationalStructureCode)));

        Site site = loadSiteById.loadSiteId(ouvrageAddDto.getSite())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("No site found with id '%s'.", ouvrageAddDto.getSite())));

        ouvrage.setCommune(commune);
        ouvrage.setStructure(organisationalStructure);
        ouvrage.setSite(site);
        ouvrage.setDeclassed(false);

        String generatedCode = generateCode(ouvrage.getType(), organisationalStructureCode);
        ouvrage.setCode(generatedCode);
        return createOuvrageMapper.ouvrageToOuvrageCreatedDto(saveOuvrage.saveOuvrage(ouvrage));
    }


    private String generateCode(OuvrageType ouvrageType, String organisationalStructureCode) {
        Integer number = loadSequelNumber.getNext(ouvrageType.name(), organisationalStructureCode) + 1;
        String code = String.join("", Collections.nCopies((4 - number.toString().length()), "0")) + number;
        return organisationalStructureCode + ouvrageType.name() + code;
    }

}

