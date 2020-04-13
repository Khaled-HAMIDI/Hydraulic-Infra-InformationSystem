package dz.ade.pfe.ouvrage.inventory.inventory.createinvetory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.port.out.inventory.createinventory.SaveInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreateInventoryAdapter implements SaveInventory {

    private final InventoryRepository inventoryRepository;
    @Override
    public Inventory saveInventory(Inventory inventory) {
        inventoryRepository.save(inventory);
        return inventory;
    }
}
