package dz.ade.pfe.port.out.inventory.getcompoenentbyinventory;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;

import java.util.List;

public interface LoadComponentByInventory {

    List<InventoryComponent> loadComponentByInventory(String inventoryCode,String ouvrageCode);
}
