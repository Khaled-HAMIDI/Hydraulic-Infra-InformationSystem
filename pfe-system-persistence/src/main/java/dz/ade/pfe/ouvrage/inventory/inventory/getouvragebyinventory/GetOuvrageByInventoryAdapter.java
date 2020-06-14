package dz.ade.pfe.ouvrage.inventory.inventory.getouvragebyinventory;
;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryOuvrageRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.inventory.getouvragebyinventory.LoadOuvrageByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GetOuvrageByInventoryAdapter implements LoadOuvrageByInventory {


    private final InventoryRepository inventoryRepository;
    private final InventoryOuvrageRepository inventoryOuvrageRepository;

    @Override
    public List<Ouvrage> loadOuvrageByInventory(String user){

        Inventory inventory =inventoryRepository.findByCompleted(false);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        List<Ouvrage> ouvrages = new ArrayList<Ouvrage>();

        inventoryOuvrages.stream()
                .forEach((inventoryOuvrage) -> {
                    if (inventoryOuvrage.getResponsable().getUsername().equals(user)){
                        ouvrages.add(inventoryOuvrage.getOuvrage());
                    }
                });

        return ouvrages;
    }
}
