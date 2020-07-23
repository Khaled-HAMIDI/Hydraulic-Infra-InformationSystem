package dz.ade.pfe.service.ouvrage.printouvragefichetechniquereport;

import dz.ade.pfe.common.report.PrintReportService;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.OuvrageType;
import dz.ade.pfe.port.in.ouvrage.printouvragefichetechniquereport.PrintOuvrageFicheTechniqueReportQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
class PrintOuvrageFicheTechniqueReportService implements PrintOuvrageFicheTechniqueReportQuery {

    private final PrintReportService printReportService;

    @Override
    public Resource execute(PrintOuvrageFicheTechniqueDto printOuvrageFicheTechniqueDto) {
        String reportId = getReportId(printOuvrageFicheTechniqueDto.getType());

        Map<String, String> params = new HashMap<>();
        params.put("code", printOuvrageFicheTechniqueDto.getCode());

        return printReportService.generateReportResource(params, reportId);
    }

    private String getReportId(String ouvrageTypeName) {
        OuvrageType ouvrageType = null;
        try {
            ouvrageType = OuvrageType.valueOf(ouvrageTypeName);
        } catch (Exception ex) {
            throw new ResourceNotFoundException(String.format("No Ouvrage '%s' type found.", ouvrageTypeName));
        }

        switch (ouvrageType) {
            case BC:
                return "fiche_brise_charge.pdf";
            case FO:
                return "fiche_forage.pdf";
            case RE:
                return "fiche_reservoir.pdf";
            case SP:
                return "fiche_station_de_pompage.pdf";
            case SC:
                return "fiche_station_de_traitement_conventionnelle.pdf";
            case SN:
                return "fiche_station_de_traitement_non_conventionnelle.pdf";
            default:
                return "";
        }
    }

}
