package dz.ade.pfe.common.report;

import java.util.Map;

public interface ReportsGenerator {

    byte[] generate(Map<String, String> params, String reportId);
}

