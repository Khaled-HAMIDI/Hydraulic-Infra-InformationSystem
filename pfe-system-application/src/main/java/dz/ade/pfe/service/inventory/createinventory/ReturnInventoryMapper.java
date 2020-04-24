package dz.ade.pfe.service.inventory.createinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReturnInventoryMapper {
    InventoryShowDto ReturnInventory(Inventory inventory);
}
