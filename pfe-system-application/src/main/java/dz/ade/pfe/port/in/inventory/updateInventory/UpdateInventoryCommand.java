package dz.ade.pfe.port.in.inventory.updateInventory;

import dz.ade.pfe.service.inventory.updateinventory.InventoryShowDto;

public interface UpdateInventoryCommand {
    InventoryShowDto updateInventory();
}
