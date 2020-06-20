package dz.ade.pfe.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryOuvrageRepository extends JpaRepository<InventoryOuvrage, Long> {

    List<InventoryOuvrage> findAllByInventory(Inventory inventory);
    InventoryOuvrage findByInventoryAndOuvrage(Inventory inventory, Ouvrage ouvrage);
}
