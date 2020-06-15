package dz.ade.pfe.ouvrage.inventory.inventory;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganisationalStructureRepository extends JpaRepository<OrganisationalStructure, Long> {

    OrganisationalStructure findByCode(String code);
}
