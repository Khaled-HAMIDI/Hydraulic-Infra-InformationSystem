package dz.ade.pfe.service.inventory.createinventorycomponent;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CreateInventoryComponentMapper {

    InventoryComponent inventoryComponentAddDtoToInventoryComponent(InventoryComponentAddDto inventoryComponentAddDto);
    InventoryComponentAddDto inventoryComponentToInventoryComponentAddDto(InventoryComponent inventoryComponent);
}
