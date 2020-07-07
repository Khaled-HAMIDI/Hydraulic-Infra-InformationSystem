package dz.ade.pfe.port.in.user.printficheuserreport;

import org.springframework.core.io.Resource;

public interface PrintFicheUserReportQuery {

    Resource generateFicheUserReportResource(String employeeCode);
}
