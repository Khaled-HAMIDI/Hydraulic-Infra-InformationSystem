package dz.ade.pfe.web.ouvrage.inventory.inventory;


import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.port.in.inventory.getcompletedinventories.GetCompletedInventoriesQuery;
import dz.ade.pfe.service.inventory.getcompletedinventories.InventoryShowDto;
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
@Api(value = "inventory", description = "Obtenir la liste des inventaires terminés")
@Component
@RequiredArgsConstructor

public class GetCompletedInventoriesController extends BaseController {
    private final GetCompletedInventoriesQuery getCompletedInventoriesQuery;

    @GetMapping(value = "/inventory/completed")
    @ApiOperation(value = "Obtenir la liste des inventaires effecués dans l'unité")
    public List<InventoryShowDto> getCompletedInventories(HttpServletRequest httpServletRequest) {

        String unitCode= securityUtils.getConnectedUserOrganisationalStructure(httpServletRequest);
        return getCompletedInventoriesQuery.getCompletedInventories(unitCode);
    }

    @GetMapping(value = "/inventory/completed/chiefs")
    @ApiOperation(value = "Obtenir la liste des chefs des inventaires effecués dans l'unité")
    public List<String> getCompletedInventoriesChiefs(HttpServletRequest httpServletRequest) {

        String unitCode= securityUtils.getConnectedUserOrganisationalStructure(httpServletRequest);
        return getCompletedInventoriesQuery.getCompletedInventoriesChiefs(unitCode);
    }
}
