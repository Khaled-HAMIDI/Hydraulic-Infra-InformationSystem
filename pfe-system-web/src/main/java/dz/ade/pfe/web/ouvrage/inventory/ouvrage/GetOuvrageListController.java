package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import dz.ade.pfe.port.in.getouvragelist.GetOuvrageListQuery;
import dz.ade.pfe.service.getouvragelist.OuvrageListDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Ouvrages", description = "Obtenir la list des ouvrages")
@Component
@RequiredArgsConstructor
public class GetOuvrageListController {

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
    public List<OuvrageListDto> getOuvrageDetails() {
        return getOuvrageListQuery.getOuvrageList();
    }
}
