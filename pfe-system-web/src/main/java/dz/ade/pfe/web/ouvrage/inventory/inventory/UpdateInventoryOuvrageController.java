package dz.ade.pfe.web.ouvrage.inventory.inventory;

import dz.ade.pfe.port.in.inventory.updateinventoryouvrage.UpdateInventoryOuvrageCommand;
import dz.ade.pfe.service.inventory.updateinventoryouvrage.InventoryShowDto;
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
public class UpdateInventoryOuvrageController {

    private final UpdateInventoryOuvrageCommand updateInventoryOuvrageCommand;

    @GetMapping(value = "/inventory/update/{inventoryCode}/{ouvrageCode}")
    @ApiOperation(value = "Update ouvrage state :completed")
    public InventoryShowDto updateInventoryOuvrage(@PathVariable(value = "inventoryCode") String inventoryCode, @PathVariable(value = "ouvrageCode") String ouvrageCode) {

        return updateInventoryOuvrageCommand.updateInventoryOuvrage(inventoryCode, ouvrageCode);
    }
}
