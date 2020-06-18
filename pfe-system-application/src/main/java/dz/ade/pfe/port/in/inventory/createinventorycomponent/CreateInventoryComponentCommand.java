package dz.ade.pfe.port.in.inventory.createinventorycomponent;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.service.inventory.createinventorycomponent.InventoryComponentAddDto;

public interface CreateInventoryComponentCommand {

    InventoryComponentAddDto createInventoryComponent(InventoryComponentAddDto inventoryComponentAddDto,String codeInventory,String codeOuvrage);
}
