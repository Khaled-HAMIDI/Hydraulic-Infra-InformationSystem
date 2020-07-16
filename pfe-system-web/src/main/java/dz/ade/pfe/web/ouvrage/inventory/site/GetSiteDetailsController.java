package dz.ade.pfe.web.ouvrage.inventory.site;

import dz.ade.pfe.port.in.site.GetSiteDetailsQuery;
import dz.ade.pfe.service.site.getsitedetails.SiteDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory")
@Component
@RequiredArgsConstructor
public class GetSiteDetailsController {
    private final GetSiteDetailsQuery getSiteDetailsQuery;
    @GetMapping(value = "/site/{id}")
    @ApiOperation(value = "Save a site")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an inventory"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public SiteDto getListSite(@PathVariable String id) {

        return getSiteDetailsQuery.getSite(id);
    }
}
