package dz.ade.pfe.web.ouvrage.inventory.inventory;


import dz.ade.pfe.port.in.inventory.getouvragebyinventory.GetOuvrageByInventoryQuery;
import dz.ade.pfe.service.inventory.getouvragebyinventory.OuvrageInventoryDto;
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
@Api(value = "inventory", description = "Obtenir la liste des ouvrages dans un inventaire  par utilisateur")
@Component
@RequiredArgsConstructor
public class GetOuvrageByInventoryController extends BaseController {
    private final GetOuvrageByInventoryQuery getOuvrageByInventoryQuery;

    @GetMapping(value = "/inventory/ouvrages")
    @ApiOperation(value = "Obtenir la liste des ouvrages inventoriés dans un inventaire")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of ouvrages"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<OuvrageInventoryDto> getOuvrageByInventory(HttpServletRequest httpServletRequest) {

        String codeUser = securityUtils.getUsername(httpServletRequest);

        return getOuvrageByInventoryQuery.getOuvrageByInventory(codeUser);
    }
}
