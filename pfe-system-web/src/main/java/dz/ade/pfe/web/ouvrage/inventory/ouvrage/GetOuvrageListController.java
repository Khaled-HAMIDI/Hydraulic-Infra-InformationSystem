package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.port.in.ouvrage.getouvragelist.GetOuvrageListQuery;
import dz.ade.pfe.service.ouvrage.getouvragelist.OuvrageListDto;
import dz.ade.pfe.web.commons.controller.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Ouvrages", description = "Obtenir la list des ouvrages")
@Component
@RequiredArgsConstructor
public class GetOuvrageListController extends BaseController {

    private final GetOuvrageListQuery getOuvrageListQuery;

    @GetMapping(value = "/ouvrages")
    @PreAuthorize("hasAnyAuthority('roles:list', '*:*')")
    @ApiOperation(value = "View a list of available ouvrages")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of commune by wilaya"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<OuvrageListDto> getOuvrageDetails(HttpServletRequest httpServletRequest) {
        String codeStructure = securityUtils.getConnectedUserOrganisationalStructureId(httpServletRequest);
        return getOuvrageListQuery.getOuvrageList(codeStructure);
    }
}
