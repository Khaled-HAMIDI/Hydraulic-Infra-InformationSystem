package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {

    boolean existsByCode(String Code);

    Ouvrage findByCode(String code);

    @Query("SELECT ouvrage FROM Ouvrage ouvrage WHERE ouvrage.code IN :ouvrages")
    List<Ouvrage> loadAllOuvrages(@Param("ouvrages") List<String> ouvrages);

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.chains c JOIN FETCH c.chain JOIN FETCH c.ouvrage ov  JOIN FETCH ov.site ")
    List<Ouvrage> findAllForSynoptic();

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.chains c JOIN FETCH c.chain ch JOIN FETCH c.ouvrage ov  JOIN FETCH ov.site where ch.code = :code ")
    List<Ouvrage> findAllForSynopticByCode(String code);
}
