package dz.ade.pfe.web.utils;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ProfileManager {

    private static final String UNIT_PREFIX = "unit";
    private static final int BEGIN_INDEX = UNIT_PREFIX.length();

    private Environment environment;

    public ProfileManager(Environment environment) {
        this.environment = environment;
    }

    public String getDeployedUnitCode() {
        String[] activeProfiles = environment.getActiveProfiles();

        int i = 0;
        int length = activeProfiles.length;
        while (i < length) {
            String activeProfile = activeProfiles[i];
            if (activeProfile.startsWith(UNIT_PREFIX)) {
                return activeProfile.substring(BEGIN_INDEX);
            }
            i++;
        }

        return "";
    }
}
