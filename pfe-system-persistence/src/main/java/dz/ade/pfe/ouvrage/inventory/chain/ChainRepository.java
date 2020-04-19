package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChainRepository extends JpaRepository<Chain, Long> {
    Optional<Chain> findByCode(String code);
}
