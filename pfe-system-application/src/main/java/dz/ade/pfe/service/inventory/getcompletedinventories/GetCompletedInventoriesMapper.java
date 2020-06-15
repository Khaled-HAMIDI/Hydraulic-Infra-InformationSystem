package dz.ade.pfe.service.inventory.getcompletedinventories;

import dz.ade.pfe.domain.ouvrage.Inventory;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GetCompletedInventoriesMapper {

    InventoryShowDto inventoryToInventoryShow(Inventory inventory);
    List<InventoryShowDto> inventoryToInventoryShow (List<Inventory> inventory);
}
