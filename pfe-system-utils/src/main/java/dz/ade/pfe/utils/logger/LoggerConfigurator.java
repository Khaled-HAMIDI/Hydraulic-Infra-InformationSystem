package dz.ade.pfe.utils.logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import serilogj.Log;
import serilogj.LoggerConfiguration;
import serilogj.core.enrichers.PropertyEnricher;
import serilogj.events.LogEventLevel;
import serilogj.sinks.rollingfile.RollingFileSinkConfigurator;
import serilogj.sinks.seq.SeqSinkConfigurator;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Service
public class LoggerConfigurator {

    @Value("${app.name}")
    private String applicationName;
    @Value("${app.logger.level}")
    private String logEventLevelProperty;
    @Value("${app.logger.seq.url}")
    private String seqUrl;
    @Value("${app.logger.rollingfile.pathtemplate}")
    private String rollingFilePathTemplate;

    private final Environment environment;

    public LoggerConfigurator(Environment environment) {
        this.environment = environment;
    }

    public void configureLogger() {
        LogEventLevel logEventLevel = LogEventLevel.valueOf(logEventLevelProperty);
        List<String> activeProfiles = Arrays.asList(environment.getActiveProfiles());
        String profiles = String.join(",", activeProfiles);

        String[] folders = rollingFilePathTemplate.split("/");
        File folder = null;
        for (int i = 0; i < folders.length - 1; i++) {
            if (i == 0) folder = new File(folders[i]);
            else folder = new File(folder, folders[i]);

            if (!folder.exists()) folder.mkdirs();
        }

        Log.setLogger(new LoggerConfiguration()
                .with(new PropertyEnricher("Environment",
                        profiles, true))
                .with(new PropertyEnricher("Application",
                        applicationName, true))
                .writeTo(RollingFileSinkConfigurator.rollingFile(rollingFilePathTemplate),
                        logEventLevel)
                .writeTo(SeqSinkConfigurator.seq(seqUrl))
                .setMinimumLevel(logEventLevel)
                .createLogger());
    }
}
