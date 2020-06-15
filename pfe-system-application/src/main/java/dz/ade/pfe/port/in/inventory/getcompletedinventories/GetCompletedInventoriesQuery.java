package dz.ade.pfe.port.in.inventory.getcompletedinventories;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.service.inventory.getcompletedinventories.InventoryShowDto;

import java.util.List;

public interface GetCompletedInventoriesQuery {
    List<InventoryShowDto> getCompletedInventory(String unitCode);
}
