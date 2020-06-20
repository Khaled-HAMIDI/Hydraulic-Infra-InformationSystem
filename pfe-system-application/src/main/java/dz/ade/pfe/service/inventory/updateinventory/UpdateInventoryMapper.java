package dz.ade.pfe.service.inventory.updateinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UpdateInventoryMapper {

    InventoryShowDto inventoryToInventoryShowDto(Inventory inventory);
}
