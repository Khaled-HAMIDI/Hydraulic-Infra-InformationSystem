package dz.ade.pfe.service.inventory.updateinventory;

import dz.ade.pfe.port.in.inventory.updateInventory.UpdateInventoryCommand;
import dz.ade.pfe.port.out.inventory.updateinventory.UpdateInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateInventoryService implements UpdateInventoryCommand {

    private final UpdateInventory updateInventory;
    private final UpdateInventoryMapper updateInventoryMapper;

    @Override
    public InventoryShowDto updateInventory() {
        return updateInventoryMapper.inventoryToInventoryShowDto(updateInventory.updateInventory());
    }
}
