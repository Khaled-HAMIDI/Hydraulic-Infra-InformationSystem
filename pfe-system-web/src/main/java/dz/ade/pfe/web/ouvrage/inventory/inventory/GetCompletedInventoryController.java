package dz.ade.pfe.web.ouvrage.inventory.inventory;


import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.port.in.inventory.getcompletedinventory.GetCompletedInventoryQuery;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory", description = "Obtenir la liste des inventaires terminés")
@Component
@RequiredArgsConstructor

public class GetCompletedInventoryController {
    private final GetCompletedInventoryQuery getCompletedInventoryQuery;

    @GetMapping(value = "/inventory")
    @ApiOperation(value = "Obtenir la liste des inventaires effecués")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of inventories"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<Inventory> getCompletedInventory() {
        return getCompletedInventoryQuery.getCompletedInventory();
    }
}
