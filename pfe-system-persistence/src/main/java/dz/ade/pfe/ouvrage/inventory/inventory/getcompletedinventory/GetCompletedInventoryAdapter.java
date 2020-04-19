package dz.ade.pfe.ouvrage.inventory.inventory.getcompletedinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.port.out.inventory.getcompletedinventory.LoadCompletedInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetCompletedInventoryAdapter implements LoadCompletedInventory {

    /* just for now*/
    private final InventoryRepository inventoryRepository;
    @Override
    public List<Inventory> loadCompletedInventory(){
        return inventoryRepository.findAll();
    }
}
