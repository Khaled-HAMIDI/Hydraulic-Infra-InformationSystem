package dz.ade.pfe.commons.street;

import dz.ade.pfe.domain.commons.Street;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaStreetRepositoryImpl extends JpaStreetRepository, JpaRepository<Street, Long> {

    @Query(value = "SELECT s FROM Street s WHERE s.district.id IN (Select id From District Where code = :code) ORDER BY designation ASC")
    List<Street> findOneByStreetCode(@Param("code") String code);

    Optional<Street> findOneByCode(String code);

    Set<Street> findByCodeIn(List<String> codes);
    
    @Transactional
    int deleteByCodeIn(List<String> codes);

    List<Street> findAllByDistrict_Agency_Code(String code);

    List<Street> findAllByDistrict_Agency_Center_Code(String code);

    List<Street> findAllByDistrict_Agency_Center_Unit_Code(String code);
}
