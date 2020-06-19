package dz.ade.pfe.port.in.inventory.getcomponentbyinventory;

import dz.ade.pfe.service.inventory.getcomponentbyinventory.InventoryComponentDto;
import java.util.List;

public interface GetComponentByInventoryQuery {

    List<InventoryComponentDto> getComponentByInventory(String inventoryCode, String ouvrageCode);
    List<InventoryComponentDto> getAllComponentByInventory(String inventoryCode);
}
