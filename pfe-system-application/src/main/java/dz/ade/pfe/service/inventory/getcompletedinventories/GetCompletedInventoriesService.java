package dz.ade.pfe.service.inventory.getcompletedinventories;

import dz.ade.pfe.port.in.inventory.getcompletedinventories.GetCompletedInventoriesQuery;
import dz.ade.pfe.port.out.inventory.getcompletedinventory.LoadCompletedInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetCompletedInventoriesService implements GetCompletedInventoriesQuery {

    private final LoadCompletedInventory loadCompletedInventory;
    private final GetCompletedInventoriesMapper getCompletedInventoriesMapper;

    @Override
    public List<InventoryShowDto> getCompletedInventories(String unitCode) {
        return getCompletedInventoriesMapper.inventoryToInventoryShow(loadCompletedInventory.loadCompletedInventories(unitCode));
    }

    @Override
    public List<String> getCompletedInventoriesChiefs(String unitCode) {
        return loadCompletedInventory.loadCompletedInventoriesChiefs(unitCode);
    }
}
