package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.OrganisationalStructure;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
interface OrganisationalStructureRepository {

	List<OrganisationalStructure> findAll();

	Optional<OrganisationalStructure> findOneByDeletedAndCode(Boolean deleted, String code);

	Optional<OrganisationalStructure> findUserOrganisationalStructure(String username);

	OrganisationalStructure save(OrganisationalStructure organisationalStructure);

}
