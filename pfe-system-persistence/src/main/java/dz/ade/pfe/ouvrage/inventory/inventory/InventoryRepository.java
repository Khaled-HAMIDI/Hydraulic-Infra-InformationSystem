package dz.ade.pfe.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import dz.ade.pfe.domain.ouvrage.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    Inventory findByCode(String code);

    Inventory findByCompleted(Boolean completed);
    Inventory findByUnitAndCompleted(OrganisationalStructure unitCode, Boolean completed);
    List<Inventory> findAllByUnitAndCompleted(OrganisationalStructure unitCode, Boolean completed);

}
