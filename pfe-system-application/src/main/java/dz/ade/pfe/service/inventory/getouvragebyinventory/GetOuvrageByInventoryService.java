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
    private final GetOuvrageByInventoryMapper getouvrageByInventoryMapper;

    @Override
    public List<OuvrageInventoryDto> getOuvrageByInventory(String user) {
        return getouvrageByInventoryMapper.ouvrageToOuvrageInventoryDto(loadOuvrageByInventory.loadOuvrageByInventory(user));
    }
}
