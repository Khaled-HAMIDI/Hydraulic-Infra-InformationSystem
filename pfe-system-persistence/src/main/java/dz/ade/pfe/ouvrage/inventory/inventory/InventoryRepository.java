package dz.ade.pfe.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Inventory findByCode(String code);
}
