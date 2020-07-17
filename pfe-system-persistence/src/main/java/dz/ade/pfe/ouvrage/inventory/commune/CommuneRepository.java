package dz.ade.pfe.ouvrage.inventory.commune;

import dz.ade.pfe.domain.commons.Commune;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommuneRepository extends JpaRepository<Commune, Long> {
    Optional<Commune> findByCode(String code);
}
