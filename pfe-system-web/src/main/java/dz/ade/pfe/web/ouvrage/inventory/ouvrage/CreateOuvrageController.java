package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.port.out.site.LoadSiteById;
import dz.ade.pfe.port.out.unit.LoadUnitByCode;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.ouvrage.getouvragedetails.OuvrageDto;
import dz.ade.pfe.web.utils.ProfileManager;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api")
@Api(value = "ouvrage", description = "Operations on ouvrage")
@Component
@RequiredArgsConstructor
public class CreateOuvrageController {

    private final CreateOuvrageQuery createOuvrageQuery;
    private final ProfileManager profileManager;

    @PostMapping(value = "/ouvrage")
    @ApiOperation(value = "Save an ouvrage")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an ouvrage"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public OuvrageDto createOuvrage(@RequestBody OuvrageAddDto ouvrageAddDto) throws Exception {
        return createOuvrageQuery.createOuvrage(ouvrageAddDto, profileManager.getDeployedUnitCode());
    }
}
