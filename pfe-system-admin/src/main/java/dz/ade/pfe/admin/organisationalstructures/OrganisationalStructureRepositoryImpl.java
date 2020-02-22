package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
@Repository
interface OrganisationalStructureRepositoryImpl extends OrganisationalStructureRepository,
        JpaRepository<OrganisationalStructure, Long> {

    Optional<OrganisationalStructure> findOneByDeletedAndCode(Boolean deleted, String code);

    @Query(value = "SELECT u.organisationalStructure FROM User u WHERE u.username = :username")
    Optional<OrganisationalStructure> findUserOrganisationalStructure(@Param("username") String username);
}
