package dz.ade.pfe.common.report;

import org.springframework.core.io.Resource;

import java.util.Locale;
import java.util.Map;

public interface PrintReportService {

    String generateReportPath(Map<String, String> params, String reportId);

    Resource generateReportResource(Map<String, String> params, String reportId);
}
