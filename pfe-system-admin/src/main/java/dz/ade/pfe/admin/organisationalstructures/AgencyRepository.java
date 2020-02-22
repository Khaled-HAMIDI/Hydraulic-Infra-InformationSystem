package dz.ade.pfe.admin.organisationalstructures;

import dz.ade.pfe.domain.admin.Agency;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/19/2018
 */
interface AgencyRepository {

    List<Agency> findAllByDeleted(Boolean deleted);

    Optional<Agency> findByCodeAndDeleted(String code, Boolean deleted);

    List<Agency> findAllByDeletedAndCenterCode(Boolean deleted, String code);

    List<Agency> findAllByDeletedAndCenterUnitCode(Boolean deleted, String code);

    Optional<Agency> findOneByDeletedAndCode(Boolean deleted, String code);

    Agency save(Agency agency);

    int delete(List<String> Agencies);

    List<Agency> findAgenciesByCenter_Code(String code);

    Optional<Agency> getAgencyWithParentStructures(String code);

    Optional<Agency> getAgencyWithCenterAndUnite(String code);
}
