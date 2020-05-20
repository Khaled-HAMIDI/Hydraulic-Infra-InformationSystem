package dz.ade.pfe.web.ouvrage.inventory.site;

import dz.ade.pfe.port.in.site.GetSiteListQuery;
import dz.ade.pfe.service.site.getsitelist.SiteDto;
import dz.ade.pfe.web.commons.controller.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory")
@Component
@RequiredArgsConstructor
public class GetSiteListController extends BaseController {
    private final GetSiteListQuery getSiteListQuery;

    @GetMapping(value = "/site")
    @ApiOperation(value = "Save a site")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an inventory"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<SiteDto> getListSite(HttpServletRequest httpServletRequest) {
        String codeStructure = securityUtils.getConnectedUserOrganisationalStructure(httpServletRequest);

        return getSiteListQuery.getSiteList(codeStructure);
    }
}
