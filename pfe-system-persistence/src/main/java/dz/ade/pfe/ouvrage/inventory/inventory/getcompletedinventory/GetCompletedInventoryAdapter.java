package dz.ade.pfe.ouvrage.inventory.inventory.getcompletedinventory;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.ouvrage.inventory.inventory.InventoryRepository;
import dz.ade.pfe.ouvrage.inventory.inventory.OrganisationalStructureRepository;
import dz.ade.pfe.port.out.inventory.getcompletedinventory.LoadCompletedInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class GetCompletedInventoryAdapter implements LoadCompletedInventory {

    private final InventoryRepository inventoryRepository;
    private final OrganisationalStructureRepository organisationalStructureRepository;

    @Override
    public List<Inventory> loadCompletedInventories(String unitCode){

        OrganisationalStructure unit = organisationalStructureRepository.findByCode(unitCode);

        return inventoryRepository.findAllByUnitAndCompleted(unit,true);
    }

    @Override
    public List<String> loadCompletedInventoriesChiefs(String unitCode){

        OrganisationalStructure unit = organisationalStructureRepository.findByCode(unitCode);
        List<Inventory> inventories= inventoryRepository.findAllByUnitAndCompleted(unit,true);
        List<String> cheifs =new ArrayList<String>();

        inventories.stream()
                .forEach((inventory) ->{
                  String chef = inventory.getHeadOfTheInventory().getFirstName() + ' '+ inventory.getHeadOfTheInventory().getLastName();
                  cheifs.add(chef);
                });

        return cheifs;
    }
}
