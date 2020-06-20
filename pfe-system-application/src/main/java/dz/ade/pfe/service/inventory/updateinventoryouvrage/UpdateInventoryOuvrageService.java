package dz.ade.pfe.service.inventory.updateinventoryouvrage;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.port.in.inventory.updateinventoryouvrage.UpdateInventoryOuvrageCommand;
import dz.ade.pfe.port.out.inventory.updateinventoryouvrage.UpdateInventoryOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateInventoryOuvrageService implements UpdateInventoryOuvrageCommand {


    private final UpdateInventoryOuvrage updateInventoryOuvrage;
    private final UpdateInventoryOuvrageMapper updateInventoryMapper;

    @Override
    public InventoryShowDto updateInventoryOuvrage(String inventoryCode, String ouvrageCode) {
        return updateInventoryMapper.inventoryToInventoryShowDto(updateInventoryOuvrage.updateInventoryOuvrage(inventoryCode,ouvrageCode));
    }
}
