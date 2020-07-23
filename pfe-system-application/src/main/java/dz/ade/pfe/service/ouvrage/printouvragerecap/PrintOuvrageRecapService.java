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
        params.put("wilaya",ouvrageRecapDto.getWilaya());
        params.put("ouvrage",ouvrageRecapDto.getOuvrage());
        params.put("type",ouvrageRecapDto.getType());
        params.put("capacity_min",ouvrageRecapDto.getCapacity_min().toString());
        params.put("capacity_max",ouvrageRecapDto.getCapacity_max().toString());
        params.put("dater",ouvrageRecapDto.getDater().toString());
        params.put("dates",ouvrageRecapDto.getDates().toString());
        params.put("role",ouvrageRecapDto.getRole());
        params.put("state",ouvrageRecapDto.getState());
        params.put("enabled",ouvrageRecapDto.getEnabled());
        params.put("cost_min",ouvrageRecapDto.getCost_min());
        params.put("cost_max",ouvrageRecapDto.getCost_max());
        return printReportService.generateReportResource(params, reportId);
    }
}
