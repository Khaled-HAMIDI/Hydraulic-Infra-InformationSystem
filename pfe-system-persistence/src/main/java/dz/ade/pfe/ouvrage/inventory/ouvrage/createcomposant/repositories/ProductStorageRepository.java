package dz.ade.pfe.ouvrage.inventory.ouvrage.createcomposant.repositories;

import dz.ade.pfe.domain.ouvrage.ProductStorage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductStorageRepository extends JpaRepository<ProductStorage, Long> {
}
