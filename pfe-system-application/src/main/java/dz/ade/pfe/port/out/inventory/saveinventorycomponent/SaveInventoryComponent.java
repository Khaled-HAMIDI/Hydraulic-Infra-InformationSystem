package dz.ade.pfe.port.out.inventory.saveinventorycomponent;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;

public interface SaveInventoryComponent {
    InventoryComponent saveInventoryComponent(InventoryComponent inventoryComponent,String codeInventoty,String codeOuvrage);
    InventoryComponent setInventoryComponent(InventoryComponent inventoryComponent);
}
