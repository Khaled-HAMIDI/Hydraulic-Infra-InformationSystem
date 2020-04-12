package dz.ade.pfe.web.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.port.in.inventory.createinventory.CreateInventoryQuery;
import dz.ade.pfe.service.inventory.createinventory.InventoryAddDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory", description = "Operations on inventory")
@Component
@RequiredArgsConstructor
public class CreateInventoryController {

    private final CreateInventoryQuery createInventoryQuery;


    @PostMapping(value = "/inventory")
    @ApiOperation(value = "Save an inventory")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully added an inventory"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public Inventory createInventory(@RequestBody InventoryAddDto inventoryAddDto) {
        return createInventoryQuery.createInventory(inventoryAddDto);
    }
}
