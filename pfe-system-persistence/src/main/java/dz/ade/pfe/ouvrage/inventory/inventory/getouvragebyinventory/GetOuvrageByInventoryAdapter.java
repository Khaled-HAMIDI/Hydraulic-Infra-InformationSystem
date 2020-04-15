package dz.ade.pfe.ouvrage.inventory.inventory.getouvragebyinventory;
;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.inventory.getouvragebyinventory.LoadOuvrageByInventory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetOuvrageByInventoryAdapter implements LoadOuvrageByInventory {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public List<Ouvrage> loadOuvrageByInventory(String code){
        return ouvrageRepository.findAll();
    }
}
