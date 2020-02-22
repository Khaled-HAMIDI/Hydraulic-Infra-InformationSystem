package dz.ade.pfe.web;

import dz.ade.pfe.commons.filesmanagement.FileStorageProperties;
import dz.ade.pfe.print.JasperServerProperties;
import dz.ade.pfe.utils.logger.LoggerConfigurator;
import dz.ade.pfe.web.security.config.SecurityProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main entry for the web module.
 *
 * @author Amine KABOUCHE (amine.kabouche@ade.dz)
 */

@SpringBootApplication
@ComponentScan(basePackages = {"dz.ade.pfe"})
@EnableJpaRepositories(basePackages = {"dz.ade.pfe"})
@EntityScan(basePackages = {"dz.ade.pfe"})
@EnableConfigurationProperties({
        FileStorageProperties.class,
        JasperServerProperties.class,
        SecurityProperties.class,
})
@EnableCaching
@EnableAsync
@EnableScheduling
public class WebApplication {

    public WebApplication(LoggerConfigurator loggerConfigurator) {
        loggerConfigurator.configureLogger();
    }

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }
}
