package dz.ade.pfe.ouvrage.inventory.inventory.getouvragebyinventory;
;
import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryOuvrageRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.OrganisationalStructureRepository;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.inventory.getouvragebyinventory.LoadOuvrageByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GetOuvrageByInventoryAdapter implements LoadOuvrageByInventory {


    private final InventoryRepository inventoryRepository;
    private final InventoryOuvrageRepository inventoryOuvrageRepository;
    private final OrganisationalStructureRepository organisationalStructureRepository;

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

    @Override
    public List<Boolean> loadOuvrageStatusByInventory(String user){

        Inventory inventory =inventoryRepository.findByCompleted(false);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        List<Boolean> ouvragesStatus = new ArrayList<Boolean>();

        inventoryOuvrages.stream()
                .forEach((inventoryOuvrage) -> {
                    if (inventoryOuvrage.getResponsable().getUsername().equals(user)){
                        ouvragesStatus.add(inventoryOuvrage.isDone());
                    }
                });

        return ouvragesStatus;
    }

    @Override
    public LocalDate loadInventoryDate(String user){

        Inventory inventory =inventoryRepository.findByCompleted(false);
        if (inventory != null) return inventory.getDate();
        else return null;
    }

    @Override
    public Inventory loadCurrentInventory(String unitCode) {

        OrganisationalStructure unit = organisationalStructureRepository.findByCode(unitCode);
        return inventoryRepository.findByUnitAndCompleted(unit,false);
    }

    @Override
    public List<LocalDate> loadDateByOuvrage(String user){

        Inventory inventory =inventoryRepository.findByCompleted(false);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        List<LocalDate> ouvragesDates = new ArrayList<LocalDate>();

        inventoryOuvrages.stream()
                .forEach((inventoryOuvrage) -> {
                    if (inventoryOuvrage.getResponsable().getUsername().equals(user)){
                        ouvragesDates.add(inventoryOuvrage.getDoneDate());
                    }
                });

        return ouvragesDates;
    }
}
