package dz.ade.pfe.commons.street;

import dz.ade.pfe.domain.commons.Street;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaStreetRepository {

    List<Street> findOneByStreetCode(String code);

    Optional<Street> findOneByCode(String code);

    Set<Street> findByCodeIn(List<String> codes);
    
    List<Street> findAll();

    Street save(Street street);

    int deleteByCodeIn(List<String> codes);

    List<Street> findAllByDistrict_Agency_Code(String code);

    List<Street> findAllByDistrict_Agency_Center_Code(String code);

    List<Street> findAllByDistrict_Agency_Center_Unit_Code(String code);
}
