package dz.ade.pfe.web;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.web.utils.ProfileManager;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AppStartupRunner implements ApplicationRunner {

    private OrganisationalStructureComponent organisationalStructureComponent;
    private ProfileManager profileManager;

    public AppStartupRunner(OrganisationalStructureComponent organisationalStructureComponent,
                            ProfileManager profileManager) {
        this.organisationalStructureComponent = organisationalStructureComponent;
        this.profileManager = profileManager;
    }

    @Override
    public void run(ApplicationArguments args) {
        organisationalStructureComponent.setDeployedUnit(profileManager.getDeployedUnitCode());
    }
}
