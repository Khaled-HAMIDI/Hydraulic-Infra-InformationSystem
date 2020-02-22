package dz.ade.pfe.print;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jasper")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JasperServerProperties {

    private String url;
    private String username;
    private String password;
}
