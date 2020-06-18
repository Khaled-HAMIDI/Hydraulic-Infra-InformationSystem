package dz.ade.pfe.service.inventory.getouvragebyinventory;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.inventory.getouvragebyinventory.GetOuvrageByInventoryQuery;
import dz.ade.pfe.port.out.inventory.getouvragebyinventory.LoadOuvrageByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetOuvrageByInventoryService  implements GetOuvrageByInventoryQuery{

    private final LoadOuvrageByInventory loadOuvrageByInventory;
    private final GetOuvrageByInventoryMapper getouvrageByInventoryMapper;

    @Override
    public List<OuvrageInventoryDto> getOuvrageByInventory(String user) {
        return getouvrageByInventoryMapper.ouvrageToOuvrageInventoryDto(loadOuvrageByInventory.loadOuvrageByInventory(user));
    }

    @Override
    public List<Boolean> getOuvrageStatusByInventory(String user) {
        return loadOuvrageByInventory.loadOuvrageStatusByInventory(user);
    }


    @Override
    public List<LocalDate> getDateByOuvrage(String user) {
        return loadOuvrageByInventory.loadDateByOuvrage(user);
    }

    @Override
    public LocalDate getInventoryDate(String user) {
        return loadOuvrageByInventory.loadInventoryDate(user);
    }

    @Override
    public InventoryShowDto getCurrentInventory(String unitCode){return  getouvrageByInventoryMapper.inventoryToInventoryShow(loadOuvrageByInventory.loadCurrentInventory(unitCode));};

}
