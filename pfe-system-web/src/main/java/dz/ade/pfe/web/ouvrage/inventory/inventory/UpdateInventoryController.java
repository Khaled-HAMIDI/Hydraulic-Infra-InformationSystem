package dz.ade.pfe.web.ouvrage.inventory.inventory;

import dz.ade.pfe.port.in.inventory.updateInventory.UpdateInventoryCommand;
import dz.ade.pfe.service.inventory.updateinventory.InventoryShowDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api")
@Api(value = "inventory")
@Component
@RequiredArgsConstructor
public class UpdateInventoryController {

    private final UpdateInventoryCommand updateInventoryCommand;

    @GetMapping(value = "/inventory/update/current")
    @ApiOperation(value = "Update current inventory state :completed")
    public InventoryShowDto updateInventory() {

        return updateInventoryCommand.updateInventory();
    }
}
