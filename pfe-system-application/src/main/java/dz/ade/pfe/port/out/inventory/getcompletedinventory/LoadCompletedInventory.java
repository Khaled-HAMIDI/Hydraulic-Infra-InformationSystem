package dz.ade.pfe.port.out.inventory.getcompletedinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;

import java.util.List;

public interface LoadCompletedInventory {
    List<Inventory> loadCompletedInventories(String unitCode);
    List<String> loadCompletedInventoriesChiefs(String unitCode);
}
