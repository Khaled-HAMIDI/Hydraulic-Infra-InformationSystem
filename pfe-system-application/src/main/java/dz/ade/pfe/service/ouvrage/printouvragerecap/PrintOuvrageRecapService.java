package dz.ade.pfe.service.ouvrage.printouvragerecap;

import dz.ade.pfe.common.report.PrintReportService;
import dz.ade.pfe.port.in.ouvrage.printouvragerecap.OuvrageRecapQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PrintOuvrageRecapService implements OuvrageRecapQuery {
    private final PrintReportService printReportService;
    private final static String reportId = "ouvrage_recap.pdf";

    @Override
    public Resource execut(OuvrageRecapDto ouvrageRecapDto) {
        Map<String, String> params = new HashMap<>();
        if (ouvrageRecapDto.getWilaya() == (null))
            params.put("wilaya", "null");
        else
            params.put("wilaya", ouvrageRecapDto.getWilaya());
        if (ouvrageRecapDto.getOuvrage() == (null))
            params.put("ouvrage", "null");
        else
            params.put("ouvrage", ouvrageRecapDto.getOuvrage());
        if (ouvrageRecapDto.getType() == (null))
            params.put("type", "null");
        else
            params.put("type", ouvrageRecapDto.getType());
        if (ouvrageRecapDto.getCapacity_min() == null)
            params.put("capacity_min", "null");
        else
            params.put("capacity_min", ouvrageRecapDto.getCapacity_min().toString());
        if (ouvrageRecapDto.getCapacity_max() == null)
            params.put("capacity_max", "null");
        else
            params.put("capacity_max", ouvrageRecapDto.getCapacity_max().toString());
        if (ouvrageRecapDto.getDater() == (null))
            params.put("dater", "null");
        else
            params.put("dater", ouvrageRecapDto.getDater().toString());
        if (ouvrageRecapDto.getDates() == (null))
            params.put("dates", "null");
        else
            params.put("dates", ouvrageRecapDto.getDates().toString());
        if (ouvrageRecapDto.getRole() == (null))
            params.put("role", "null");
        else
            params.put("role", ouvrageRecapDto.getRole());
        if (ouvrageRecapDto.getState() == (null))
            params.put("state", "null");
        else
            params.put("state", ouvrageRecapDto.getState());
        if (ouvrageRecapDto.getEnabled() == (null))
            params.put("enabled", "null");
        else
            params.put("enabled", ouvrageRecapDto.getEnabled());
        if (ouvrageRecapDto.getCapacity_min() == null)
            params.put("cost_min", "null");
        else
            params.put("cost_min", ouvrageRecapDto.getCost_min());
        if (ouvrageRecapDto.getCapacity_max() == null)
            params.put("cost_max", "null");
        else
            params.put("cost_max", ouvrageRecapDto.getCost_max());
        return printReportService.generateReportResource(params, reportId);
    }
}
