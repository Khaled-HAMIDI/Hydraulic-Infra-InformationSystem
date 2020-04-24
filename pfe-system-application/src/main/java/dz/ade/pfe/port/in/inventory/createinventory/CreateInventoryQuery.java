package dz.ade.pfe.port.in.inventory.createinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.service.inventory.createinventory.InventoryAddDto;
import dz.ade.pfe.service.inventory.createinventory.InventoryShowDto;

public interface CreateInventoryQuery {
    InventoryShowDto createInventory(InventoryAddDto inventoryAddDto,String unitCode);
}
