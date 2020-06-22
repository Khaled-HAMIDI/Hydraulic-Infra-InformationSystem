package dz.ade.pfe.service.inventory.getcomponentbyinventory;

import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GetComponentByInventoryMapper {

    @Mappings({
            @Mapping(source = "ouvrage.code", target = "ouvrageCode"),
            @Mapping(source = "inventory.code", target = "inventoryCode"),
    })
    InventoryComponentDto inventoryComponentToInventoryComponentDto(InventoryComponent inventoryComponent);

    List<InventoryComponentDto> inventoryComponentToInventoryComponentDto(List<InventoryComponent> inventoryComponent);
}
