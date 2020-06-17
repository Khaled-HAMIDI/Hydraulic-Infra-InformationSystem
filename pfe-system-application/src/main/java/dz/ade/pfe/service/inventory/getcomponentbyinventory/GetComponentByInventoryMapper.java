package dz.ade.pfe.service.inventory.getcomponentbyinventory;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GetComponentByInventoryMapper {

    InventoryComponentDto inventoryComponentToInventoryComponentDto(InventoryComponent inventoryComponent);

    List<InventoryComponentDto> inventoryComponentToInventoryComponentDto(List<InventoryComponent> inventoryComponent);
}
