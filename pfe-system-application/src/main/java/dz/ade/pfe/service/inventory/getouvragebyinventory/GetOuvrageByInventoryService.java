package dz.ade.pfe.service.inventory.getouvragebyinventory;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.inventory.getouvragebyinventory.GetOuvrageByInventoryQuery;
import dz.ade.pfe.port.out.inventory.getouvragebyinventory.LoadOuvrageByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetOuvrageByInventoryService  implements GetOuvrageByInventoryQuery{

    private final LoadOuvrageByInventory loadOuvrageByInventory;

    @Override
    public List<Ouvrage> getOuvrageByInventory(String code) {
        return loadOuvrageByInventory.loadOuvrageByInventory(code);
    }
}
