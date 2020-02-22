package dz.ade.pfe.commons.district;

import dz.ade.pfe.domain.commons.District;
import dz.ade.pfe.domain.commons.Street;

import java.util.List;
import java.util.Optional;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaDistrictRepository {

    List<District> findAllByAgency_CodeOrderById(String code);
    
    List<District> findAll();

    Optional<District> findByCode(String code);

    District save(District district);

    int deleteByCodeIn(List<String> codes);

    List<District> findAllByAgency_Code(String code);

    List<District> findAllByAgency_Center_Code(String code);

    List<District> findAllByAgency_Center_Unit_Code(String code);
}
