package dz.ade.pfe.ouvrage.inventory.inventory.getcomponentbyinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryComponentRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.inventory.getcompoenentbyinventory.LoadComponentByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GetComponentByInventoryAdapter implements LoadComponentByInventory {

    private final InventoryComponentRepository inventoryComponentRepository;
    private final InventoryRepository inventoryRepository;
    private final OuvrageRepository ouvrageRepository;

    @Override
    public List<InventoryComponent> loadComponentByInventory(String inventoryCode,String ouvrageCode){

        Inventory inventory = inventoryRepository.findByCode(inventoryCode);
        Ouvrage ouvrage = ouvrageRepository.findByCode(ouvrageCode);

        return inventoryComponentRepository.findAllByInventoryAndAndOuvrage(inventory,ouvrage);
    }
}
