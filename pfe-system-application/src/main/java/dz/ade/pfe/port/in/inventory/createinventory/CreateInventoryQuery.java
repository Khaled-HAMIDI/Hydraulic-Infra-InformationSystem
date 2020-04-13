package dz.ade.pfe.port.in.inventory.createinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.service.inventory.createinventory.InventoryAddDto;

public interface CreateInventoryQuery {
    Inventory createInventory(InventoryAddDto inventoryAddDto);
}
