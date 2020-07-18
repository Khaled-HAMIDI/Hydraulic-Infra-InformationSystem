package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {

    List<Ouvrage> findByDeclassed(boolean state);

    boolean existsByCode(String Code);

    Ouvrage findByCode(String code);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Ouvrage o SET o.declassed = true, o.declassedDate = CURRENT_TIMESTAMP where o.code = :code")
    void deleteOuvrage(String code);

    @Query(value = "select count(*) from pfe.ouvrage o join pfe.organisational_structure s on o.structure_id=s.id where o.type like :type and s.code= :code", nativeQuery = true)
    Integer getNext(String type, String code);

    @Query("SELECT distinct o FROM Ouvrage o JOIN  o.structure u where u.code=:code and o.declassed = false")
    List<Ouvrage> findByUnitCode(String code);

    @Query("SELECT distinct o FROM Ouvrage o JOIN  o.structure u where u.code=:code and o.declassed = true")
    List<Ouvrage> findByUnitCodeDeclassed(String code);

    @Query("SELECT ouvrage FROM Ouvrage ouvrage WHERE ouvrage.code IN :ouvrages and ouvrage.declassed = false")
    List<Ouvrage> loadAllOuvrages(@Param("ouvrages") List<String> ouvrages);

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.readings r   JOIN  o.chains c JOIN  c.chain JOIN  c.ouvrage ov  JOIN  ov.site where o.declassed = false order by o.id,r.date desc")
    List<Ouvrage> findAllForSynoptic();

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.readings r   JOIN  o.chains c JOIN  c.chain ch JOIN  c.ouvrage ov  JOIN  ov.site  where ch.code = :code and  o.declassed = false order by o.id,r.date desc ")
    List<Ouvrage> findAllForSynopticByCode(String code);

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.readings r where o.declassed = false order by o.id,r.date desc")
    List<Ouvrage> loadOuvragesExploitation();

    @Query("SELECT distinct o FROM Ouvrage o JOIN FETCH o.readings r  join o.personnels p join p.user u where u.username = :codeUser and  o.declassed = false order by o.id,r.date desc")
    List<Ouvrage> loadOuvragesExploitation(String codeUser);

    @Query(value = "select * from pfe.ouvrage ov where id not in (select o.id from pfe.ouvrage as o join pfe.exploitation_reading as r on( o.id=r.ouvrage_id)) and  ov.declassed = false", nativeQuery = true)
    List<Ouvrage> loadOuvragesNotInExploitation();

    @Query(value = "select o.type,count(*) from pfe.ouvrage o where o.declassed = false group by o.type", nativeQuery = true)
    List<Object> loadNbOuvrages();

    @Query(value = "select count(ouvrage_id) from pfe.exploitation_reading", nativeQuery = true)
    Object loadNbAllOuvrages();

    @Query(value = "select count(*) from pfe.ouvrage o where o.declassed = false", nativeQuery = true)
    Object loadNbTotal();


}
