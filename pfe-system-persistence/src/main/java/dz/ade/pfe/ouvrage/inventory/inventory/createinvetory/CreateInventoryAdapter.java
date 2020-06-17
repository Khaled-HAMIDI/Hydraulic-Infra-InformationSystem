package dz.ade.pfe.ouvrage.inventory.inventory.createinvetory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryComponentRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryOuvrageRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.port.out.inventory.createinventory.SaveInventory;
import dz.ade.pfe.port.out.inventory.saveinventorycomponent.SaveInventoryComponent;
import dz.ade.pfe.port.out.inventory.saveinventoryouvrage.SaveInventoryOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreateInventoryAdapter implements SaveInventory, SaveInventoryOuvrage, SaveInventoryComponent {

    private final InventoryRepository inventoryRepository;
    private final InventoryOuvrageRepository inventoryOuvrageRepository;
    private final InventoryComponentRepository inventoryComponentRepository;

    @Override
    public Inventory saveInventory(Inventory inventory) {
        inventoryRepository.save(inventory);
        return inventory;
    }

    @Override
    public InventoryOuvrage saveInventoryOuvrage(InventoryOuvrage inventoryOuvrage) {
        return inventoryOuvrageRepository.save(inventoryOuvrage);
    }

    @Override
    public InventoryComponent saveInventoryComponent(InventoryComponent inventoryComponent) {
        return inventoryComponentRepository.save(inventoryComponent);
    }
}
