package dz.ade.pfe.port.out.inventory.createinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;

public interface SaveInventory {
    Inventory saveInventory(Inventory inventory);
}
