package dz.ade.pfe.service.inventory.getcomponentbyinventory;

import dz.ade.pfe.port.in.inventory.getcomponentbyinventory.GetComponentByInventoryQuery;
import dz.ade.pfe.port.out.inventory.getcompoenentbyinventory.LoadComponentByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetComponentByInventoryService implements GetComponentByInventoryQuery {

    private final LoadComponentByInventory loadComponentByInventory;
    private final GetComponentByInventoryMapper getComponentByInventoryMapper;

    @Override
    public List<InventoryComponentDto> getComponentByInventory(String inventoryCode, String ouvrageCode) {
        return getComponentByInventoryMapper.inventoryComponentToInventoryComponentDto(loadComponentByInventory.loadComponentByInventory(inventoryCode,ouvrageCode));
    }
}
