package dz.ade.pfe.service.inventory.getcompletedinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.port.in.inventory.getcompletedinventory.GetCompletedInventoryQuery;
import dz.ade.pfe.port.out.inventory.getcompletedinventory.LoadCompletedInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetCompletedInventoryService implements GetCompletedInventoryQuery {

    private final LoadCompletedInventory loadCompletedInventory;

    @Override
    public List<Inventory> getCompletedInventory() {
        return loadCompletedInventory.loadCompletedInventory();
    }
}
