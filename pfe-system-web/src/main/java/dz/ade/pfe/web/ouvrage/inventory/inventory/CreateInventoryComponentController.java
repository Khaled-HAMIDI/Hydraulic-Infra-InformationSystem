package dz.ade.pfe.web.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.port.in.inventory.createinventorycomponent.CreateInventoryComponentCommand;
import dz.ade.pfe.service.inventory.createinventorycomponent.InventoryComponentAddDto;
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
public class CreateInventoryComponentController {

    private final CreateInventoryComponentCommand createInventoryComponentCommand;

    @PostMapping(value = "/inventory/{codeInventory}/{codeOuvrage}/components")
    @ApiOperation(value = "Save an inventoryComponent")
    public InventoryComponentAddDto createInventory(@RequestBody InventoryComponentAddDto inventoryComponentAddDto,@PathVariable(value="codeInventory") String codeInventory,@PathVariable(value="codeOuvrage") String codeOuvrage) {

        return createInventoryComponentCommand.createInventoryComponent(inventoryComponentAddDto,codeInventory,codeOuvrage);
    }
}
