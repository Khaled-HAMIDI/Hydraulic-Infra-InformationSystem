package dz.ade.pfe.port.out.inventory.updateinventoryouvrage;

import dz.ade.pfe.domain.ouvrage.Inventory;

public interface UpdateInventoryOuvrage {
    Inventory updateInventoryOuvrage(String inventoryCode, String ouvrageCode);
}
