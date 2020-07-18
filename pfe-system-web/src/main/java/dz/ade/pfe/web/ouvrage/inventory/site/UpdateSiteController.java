package dz.ade.pfe.web.ouvrage.inventory.site;

import dz.ade.pfe.port.in.site.UpdateSiteCommand;
import dz.ade.pfe.service.site.updatesite.SiteDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory")
@Component
@RequiredArgsConstructor
public class UpdateSiteController {
    private final UpdateSiteCommand updateSiteCommand;
    @PutMapping(value = "/site/{id}")
    @ApiOperation(value = "Update user information")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated user information"),
            @ApiResponse(code = 401, message = "You are unauthorized to update user information"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The user you are trying to update is not found")
    })
    boolean updateSite(@Valid @RequestBody SiteDto siteDto){
        return updateSiteCommand.updateSite(siteDto);
    }
}
