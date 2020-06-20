package dz.ade.pfe.ouvrage.inventory.inventory.updateinventoryouvrage;

import dz.ade.pfe.domain.exceptions.InventoryValidationExecption;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryComponentRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryOuvrageRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.inventory.updateinventoryouvrage.UpdateInventoryOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class updateInventoryOuvrageAdapter implements UpdateInventoryOuvrage {

    private final InventoryRepository inventoryRepository;
    private final InventoryOuvrageRepository inventoryOuvrageRepository;
    private final InventoryComponentRepository inventoryComponentRepository;
    private final OuvrageRepository ouvrageRepository;

    @Override
    public Inventory updateInventoryOuvrage(String inventoryCode, String ouvrageCode) {

        Inventory inventory = inventoryRepository.findByCode(inventoryCode);
        Ouvrage ouvrage =ouvrageRepository.findByCode(ouvrageCode);

        List<InventoryComponent> inventoryComponents = inventoryComponentRepository.findAllByInventoryAndOuvrage(inventory,ouvrage);

        inventoryComponents.forEach((inventoryComponent) ->{
            if (!inventoryComponent.getDone()) throw new InventoryValidationExecption("invalidInventoryOuvrage");
        });

        InventoryOuvrage inventoryOuvrage =inventoryOuvrageRepository.findByInventoryAndOuvrage(inventory,ouvrage);
        inventoryOuvrage.setDone(true);
        inventoryOuvrage.setDoneDate(LocalDate.now());
        inventoryOuvrageRepository.save(inventoryOuvrage);
        return inventory;
    }
}
