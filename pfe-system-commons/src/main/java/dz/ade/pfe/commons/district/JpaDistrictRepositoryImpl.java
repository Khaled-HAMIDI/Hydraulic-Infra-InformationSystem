package dz.ade.pfe.commons.district;

import dz.ade.pfe.domain.commons.District;
import dz.ade.pfe.domain.commons.Street;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaDistrictRepositoryImpl extends JpaDistrictRepository, JpaRepository<District, Long> {

    List<District> findAllByAgency_CodeOrderById(String code);

    @Transactional
    int deleteByCodeIn(List<String> codes);

    List<District> findAllByAgency_Code(String code);

    List<District> findAllByAgency_Center_Code(String code);

    List<District> findAllByAgency_Center_Unit_Code(String code);
}
