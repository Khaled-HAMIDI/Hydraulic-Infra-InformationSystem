package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {

    boolean existsByCode(String Code);

    Ouvrage findByCode(String code);

    @Query(value = "select count(*) from pfe.ouvrage o join pfe.organisational_structure s on o.unit_id=s.id where o.type like :type and s.code= :code", nativeQuery = true)
    Integer getNext(String type ,String code);

    @Query("SELECT distinct o FROM Ouvrage o JOIN  o.unit u where u.code=:code")
    List<Ouvrage> findByUnitCode (String code);

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

    @Query(value = "select o.type,count(*) from pfe.ouvrage o group by o.type", nativeQuery = true)
    List<Object> loadNbOuvrages();

    @Query(value = "select count(ouvrage_id) from pfe.exploitation_reading", nativeQuery = true)
    Object loadNbAllOuvrages();

    @Query(value = "select count(*) from pfe.ouvrage", nativeQuery = true)
    Object loadNbTotal();


}
