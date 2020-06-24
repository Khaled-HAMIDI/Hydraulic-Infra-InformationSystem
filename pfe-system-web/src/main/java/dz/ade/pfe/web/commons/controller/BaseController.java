package dz.ade.pfe.web.commons.controller;

import dz.ade.pfe.admin.organisationalstructures.OrganisationalStructureComponent;
import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.web.utils.ProfileManager;
import dz.ade.pfe.web.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

public abstract class BaseController {

    @Autowired
    protected SecurityUtils securityUtils;
    @Autowired
    protected ProfileManager profileManager;
    @Autowired
    protected OrganisationalStructureComponent organisationalStructureComponent;


    protected OrganisationalStructure getUserOrganisationalStructure(HttpServletRequest httpServletRequest) {
        String structureId = securityUtils.getConnectedUserOrganisationalStructureId(httpServletRequest);

        return organisationalStructureComponent.getStructure(structureId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("There is not structure with given code : %s", structureId)));
    }

    protected Unit getDeployedUnit() {
        return organisationalStructureComponent.getUnitByCode(profileManager.getDeployedUnitCode())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Unit with {code %s} not found", profileManager.getDeployedUnitCode())));
    }
}
