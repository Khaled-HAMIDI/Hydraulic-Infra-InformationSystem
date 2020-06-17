package dz.ade.pfe.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.InventoryComponent;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryComponentRepository  extends JpaRepository<InventoryComponent, Long> {
    List<InventoryComponent> findAllByInventoryAndAndOuvrage(Inventory inventory, Ouvrage ouvrage);
}
