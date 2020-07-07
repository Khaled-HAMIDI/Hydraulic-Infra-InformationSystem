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
    public List<Ouvrage> loadOuvrageByCurrentInventory(String user){

        Inventory inventory =inventoryRepository.findByCompleted(false);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        List<Ouvrage> ouvrages = new ArrayList<Ouvrage>();

        inventoryOuvrages.stream()
                .forEach((inventoryOuvrage) -> {
                    if (inventoryOuvrage.getResponsable().getUsername().equals(user)){
                        ouvrages.add(inventoryOuvrage.getOuvrage());
                    }
                });
        if(ouvrages.size()>0)
            return ouvrages;
        else{
            List<InventoryOuvrage> inventoryOuvrages2 = inventoryOuvrageRepository.findAllByInventory(inventory);
            List<Ouvrage> ouvrages2 = new ArrayList<Ouvrage>();
            inventoryOuvrages2.stream()
                    .forEach((inventoryOuvrage) -> {

                        ouvrages2.add(inventoryOuvrage.getOuvrage());

                    });
            return ouvrages2;
        }
    }

    @Override
    public List<Ouvrage> loadOuvrageByInventory(String InventoryCode,String user){

        Inventory inventory =inventoryRepository.findByCode(InventoryCode);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        List<Ouvrage> ouvrages = new ArrayList<Ouvrage>();

        inventoryOuvrages.stream()
                .forEach((inventoryOuvrage) -> {
                    if (inventoryOuvrage.getResponsable().getUsername().equals(user)){
                        ouvrages.add(inventoryOuvrage.getOuvrage());
                    }
                });
        if(ouvrages.size()>0)
        return ouvrages;
        else{
            List<InventoryOuvrage> inventoryOuvrages2 = inventoryOuvrageRepository.findAllByInventory(inventory);
            List<Ouvrage> ouvrages2 = new ArrayList<Ouvrage>();
            inventoryOuvrages2.stream()
                    .forEach((inventoryOuvrage) -> {

                        ouvrages2.add(inventoryOuvrage.getOuvrage());

                    });
            return ouvrages2;
        }
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

        if(ouvragesStatus.size()>0)
        return ouvragesStatus;
        else{
            List<InventoryOuvrage> inventoryOuvrages2 = inventoryOuvrageRepository.findAllByInventory(inventory);
            List<Boolean> ouvrages2 = new ArrayList<Boolean>();
            inventoryOuvrages2.stream()
                    .forEach((inventoryOuvrage) -> {

                        ouvrages2.add(inventoryOuvrage.isDone());

                    });
            return ouvrages2;
        }
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

        if(ouvragesDates.size()>0)
            return ouvragesDates;
        else{
            List<InventoryOuvrage> inventoryOuvrages2 = inventoryOuvrageRepository.findAllByInventory(inventory);
            List<LocalDate> ouvrages2 = new ArrayList<LocalDate>();
            inventoryOuvrages2.stream()
                    .forEach((inventoryOuvrage) -> {

                        ouvrages2.add(inventoryOuvrage.getDoneDate());

                    });
            return ouvrages2;
        }
    }

    @Override
    public List<LocalDate> loadDateByOuvrageByInventory(String inventoryCode,String user){

        Inventory inventory =inventoryRepository.findByCode(inventoryCode);
        List<InventoryOuvrage> inventoryOuvrages = inventoryOuvrageRepository.findAllByInventory(inventory);

        List<LocalDate> ouvragesDates = new ArrayList<LocalDate>();

        inventoryOuvrages.stream()
                .forEach((inventoryOuvrage) -> {
                    if (inventoryOuvrage.getResponsable().getUsername().equals(user)){
                        ouvragesDates.add(inventoryOuvrage.getDoneDate());
                    }
                });

        if(ouvragesDates.size()>0)
            return ouvragesDates;
        else{
            List<InventoryOuvrage> inventoryOuvrages2 = inventoryOuvrageRepository.findAllByInventory(inventory);
            List<LocalDate> ouvrages2 = new ArrayList<LocalDate>();
            inventoryOuvrages2.stream()
                    .forEach((inventoryOuvrage) -> {

                        ouvrages2.add(inventoryOuvrage.getDoneDate());

                    });
            return ouvrages2;
        }
    }
}
