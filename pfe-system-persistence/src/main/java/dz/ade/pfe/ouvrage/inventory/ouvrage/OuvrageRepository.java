package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {
    Ouvrage findByCode(String code);
}
