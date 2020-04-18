package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OuvrageChainRepository extends JpaRepository<OuvrageChain, Long> {
    void deleteByIdIn(List<Long> ids);
}
