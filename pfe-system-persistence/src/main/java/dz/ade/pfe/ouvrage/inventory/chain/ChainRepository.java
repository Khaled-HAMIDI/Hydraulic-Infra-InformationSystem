package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChainRepository extends JpaRepository<Chain, Long> {
    Chain findByCode(String code);
}
