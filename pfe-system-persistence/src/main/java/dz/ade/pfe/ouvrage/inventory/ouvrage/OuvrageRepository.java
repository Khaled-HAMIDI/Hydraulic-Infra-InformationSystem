package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.exploitation.getouvrages.OuvrageExploitationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {

    boolean existsByCode(String Code);

    Ouvrage findByCode(String code);

    @Query("SELECT ouvrage FROM Ouvrage ouvrage WHERE ouvrage.code IN :ouvrages")
    List<Ouvrage> loadAllOuvrages(@Param("ouvrages") List<String> ouvrages);

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.chains c JOIN FETCH c.chain JOIN FETCH c.ouvrage ov  JOIN FETCH ov.site ")
    List<Ouvrage> findAllForSynoptic();

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.chains c JOIN FETCH c.chain ch JOIN FETCH c.ouvrage ov  JOIN FETCH ov.site where ch.code = :code ")
    List<Ouvrage> findAllForSynopticByCode(String code);

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.readings r order by o.id,r.date desc")
    List<Ouvrage> loadOuvragesExploitation();

    @Query(value = "select * from pfe.ouvrage where id not in (select o.id from pfe.ouvrage as o join pfe.exploitation_reading as r on( o.id=r.ouvrage_id))", nativeQuery = true)
    List<Ouvrage> loadOuvragesNotInExploitation();
}
