package dz.ade.pfe.port.in.inventory.updateinventoryouvrage;

import dz.ade.pfe.service.inventory.updateinventoryouvrage.InventoryShowDto;

public interface UpdateInventoryOuvrageCommand {
    InventoryShowDto updateInventoryOuvrage(String inventoryCode, String ouvrageCode );
}
