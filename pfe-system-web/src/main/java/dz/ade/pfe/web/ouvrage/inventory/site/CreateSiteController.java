package dz.ade.pfe.web.ouvrage.inventory.site;


import dz.ade.pfe.port.in.site.CreateSiteQuery;
import dz.ade.pfe.service.inventory.createinventory.InventoryAddDto;
import dz.ade.pfe.service.site.createsite.SiteDto;
import dz.ade.pfe.web.utils.ProfileManager;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory", description = "Operations on inventory")
@Component
@RequiredArgsConstructor
public class CreateSiteController {
    private final CreateSiteQuery createSiteQuery;
    private final ProfileManager profileManager;
    @PostMapping(value = "/site")
    @ApiOperation(value = "Save a site")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an inventory"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public SiteDto CreateSite(@RequestBody SiteDto siteDto){
        return  createSiteQuery.createSite(siteDto,profileManager.getDeployedUnitCode());
    }
}
