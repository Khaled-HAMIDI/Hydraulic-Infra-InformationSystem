package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.OuvrageComponent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OuvrageComposantRepository extends JpaRepository<OuvrageComponent, Long> {
}
