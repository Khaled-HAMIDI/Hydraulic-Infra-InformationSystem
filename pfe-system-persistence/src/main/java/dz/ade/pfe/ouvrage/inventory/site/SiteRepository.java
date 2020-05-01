package dz.ade.pfe.ouvrage.inventory.site;

import dz.ade.pfe.domain.ouvrage.Site;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SiteRepository extends JpaRepository<Site, Long> {
    List<Site> findByUnitCode(String code);
}
