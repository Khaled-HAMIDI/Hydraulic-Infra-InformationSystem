package dz.ade.pfe.service.user.printficheuserreport;

import dz.ade.pfe.common.report.PrintReportService;
import dz.ade.pfe.port.in.user.printficheuserreport.PrintFicheUserReportQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
class PrintUserReportService implements PrintFicheUserReportQuery {
    private final static String reportId = "fiche_user.pdf";

    private final PrintReportService printReportService;

    @Override
    public Resource generateFicheUserReportResource(String employeeCode) {
        Map<String, String> params = new HashMap<>();
        params.put("code_user", employeeCode);

       return printReportService.generateReportResource(params, reportId);
    }
}
