package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OuvrageRepository extends JpaRepository<Ouvrage, Long> {

    Ouvrage findByCode(String code);

    @Query("SELECT ouvrage FROM Ouvrage ouvrage WHERE ouvrage.code IN :ouvrages")
    List<Ouvrage> loadAllOuvrages(@Param("ouvrages") List<String> ouvrages);
}
