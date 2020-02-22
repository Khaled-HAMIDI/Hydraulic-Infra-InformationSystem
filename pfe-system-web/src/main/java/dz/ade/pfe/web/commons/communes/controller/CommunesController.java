package dz.ade.pfe.web.commons.communes.controller;

import dz.ade.pfe.commons.commune.CommuneComponent;
import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.web.commons.communes.dto.CommuneListDto;
import dz.ade.pfe.web.commons.communes.mapper.CommunesMapper;
import dz.ade.pfe.web.utils.ProfileManager;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "commune", description = "Operations on commune")
public class CommunesController {

    private CommuneComponent communeComponent;
    private CommunesMapper communesMapper;
    private ProfileManager profileManager;

    public CommunesController(CommuneComponent communeComponent,
                              CommunesMapper communesMapper,
                              ProfileManager profileManager) {
        this.communeComponent = communeComponent;
        this.communesMapper = communesMapper;
        this.profileManager = profileManager;
    }

    @GetMapping(value = "/wilayas/{code}/communes")
    @ApiOperation(value = "View a list of available commune by wilaya")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune by wilaya"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<CommuneListDto> getCommunesByWilaya(@PathVariable String code) {
        List<Commune> communes = communeComponent.getCommuneByWilaya(code);
        return communesMapper.communeToCommuneListDto(communes);
    }

    @GetMapping(value = "/deployedunit/communes")
    @ApiOperation(value = "View a list of available commune of deployed unit")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune of deployed unit"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<CommuneListDto> getCommunesByWilaya() {
        return getCommunesByWilaya(profileManager.getDeployedUnitCode());
    }
}
