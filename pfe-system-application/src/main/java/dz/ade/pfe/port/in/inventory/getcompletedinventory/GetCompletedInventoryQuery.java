package dz.ade.pfe.port.in.inventory.getcompletedinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;

import java.util.List;

public interface GetCompletedInventoryQuery {
    List<Inventory> getCompletedInventory();
}
