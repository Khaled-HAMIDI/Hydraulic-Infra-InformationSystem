package dz.ade.pfe.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.ouvrage.InventoryOuvrage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryOuvrageRepository extends JpaRepository<InventoryOuvrage, Long> {
}
