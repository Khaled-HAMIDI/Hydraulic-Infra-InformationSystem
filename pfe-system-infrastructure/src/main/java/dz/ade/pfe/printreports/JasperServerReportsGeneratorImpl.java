package dz.ade.pfe.printreports;

import dz.ade.pfe.common.report.ReportsGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JasperServerReportsGeneratorImpl implements ReportsGenerator {
    private final RestTemplateBuilder restTemplate;
    private final JasperServerProperties jasperServerProperties;

    @Override
    public byte[] generate(Map<String, String> params, String reportId) {
        String url = generateUrl(params, reportId);

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_OCTET_STREAM));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<byte[]> response = restTemplate.build()
                .exchange(url, HttpMethod.GET, entity, byte[].class);
        return response.getBody();
    }

    private String generateUrl(Map<String, String> params, String reportId) {
       return String.format("%s/%s?j_username=%s&j_password=%s%s",
                jasperServerProperties.getUrl(),
                reportId,
                jasperServerProperties.getUsername(),
                jasperServerProperties.getPassword(),
                generateParams(params));
    }

    private String generateParams(Map<String, String> params) {
        return params.entrySet().stream()
                .map(param -> String.format("&%s=%s", param.getKey(), param.getValue()))
                .collect(Collectors.joining());
    }
}
