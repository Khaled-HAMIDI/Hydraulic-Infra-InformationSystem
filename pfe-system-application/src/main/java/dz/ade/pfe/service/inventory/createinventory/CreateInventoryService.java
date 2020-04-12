package dz.ade.pfe.service.inventory.createinventory;


import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.inventory.createinventory.CreateInventoryQuery;

import dz.ade.pfe.port.out.inventory.createinventory.SaveInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateInventoryService implements CreateInventoryQuery {
    //@Autowired
    private final SaveInventory saveInventory;

    @Override
    public Inventory createInventory(InventoryAddDto inventoryAddDto){

        Inventory inventory = new Inventory();

        inventory.setCode(inventoryAddDto.getCode());
        inventory.setDate(inventoryAddDto.getDate());
        inventory.setResponsable(inventoryAddDto.getResponsable());
        inventory.setCompleted(inventoryAddDto.getCompleted());

        return saveInventory.saveInventory(inventory);
    }
}