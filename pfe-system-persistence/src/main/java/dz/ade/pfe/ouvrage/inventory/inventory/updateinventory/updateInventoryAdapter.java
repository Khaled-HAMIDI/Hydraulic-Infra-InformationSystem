package dz.ade.pfe.ouvrage.inventory.inventory.updateinventory;

import dz.ade.pfe.domain.exceptions.InventoryValidationExecption;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryOuvrageRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.port.out.inventory.updateinventory.UpdateInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class updateInventoryAdapter implements UpdateInventory {

    private final InventoryRepository inventoryRepository;
    private final InventoryOuvrageRepository inventoryOuvrageRepository;

    @Override
    public Inventory updateInventory() {

        Inventory inventory = inventoryRepository.findByCompleted(false);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        inventoryOuvrages.forEach((inventoryOuvrage) ->{
            if (!inventoryOuvrage.isDone()) throw new InventoryValidationExecption("invalidInventory");
        });

        inventory.setCompleted(true);
        inventory.setFinishDate(LocalDate.now());
        inventoryRepository.save(inventory);

        return inventory;
    }

}
