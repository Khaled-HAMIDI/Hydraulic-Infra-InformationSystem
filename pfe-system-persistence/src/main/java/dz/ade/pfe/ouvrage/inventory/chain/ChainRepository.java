package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChainRepository extends JpaRepository<Chain, Long> {
    Optional<Chain> findByCode(String code);
    @Query("SELECT distinct c FROM Chain c JOIN FETCH c.ouvrages o")
    List<Chain> findAll();

    @Query("SELECT distinct c FROM Chain c JOIN FETCH c.ouvrages o JOIN FETCH o.chain JOIN FETCH o.ouvrage ov  JOIN FETCH ov.site")
    List<Chain> findAllForSynoptic();
}
