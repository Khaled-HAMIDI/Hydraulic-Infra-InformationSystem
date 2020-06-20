package dz.ade.pfe.service.inventory.updateinventoryouvrage;

import dz.ade.pfe.domain.ouvrage.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UpdateInventoryOuvrageMapper {

    InventoryShowDto inventoryToInventoryShowDto(Inventory inventory);
}
