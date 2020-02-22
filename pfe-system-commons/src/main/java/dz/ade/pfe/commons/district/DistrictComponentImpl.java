package dz.ade.pfe.commons.district;

import com.google.common.collect.Lists;
import dz.ade.pfe.commons.street.JooqStreetRepository;
import dz.ade.pfe.domain.admin.StructureType;
import dz.ade.pfe.domain.commons.District;
import dz.ade.pfe.domain.commons.Street;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
@Component
class DistrictComponentImpl implements DistrictComponent {

    private JpaDistrictRepository jpaDistrictRepository;
    private JooqStreetRepository jooqStreetRepository;

    public DistrictComponentImpl(JpaDistrictRepository jpaDistrictRepository,JooqStreetRepository jooqStreetRepository){
        this.jpaDistrictRepository = jpaDistrictRepository;
        this.jooqStreetRepository = jooqStreetRepository;
    }

    @Override
    public List<District> getDistricts(String code) {
        return Lists.newArrayList(jpaDistrictRepository.findAllByAgency_CodeOrderById(code));
    }

    @Override
    public Optional<District> getDistrictByCode(String code) {
        return jpaDistrictRepository.findByCode(code);
    }

    @Override
    public District saveDistrict(District district) {
        return jpaDistrictRepository.save(district);
    }

    @Override
    public District updateDistrict(District district) {
        return jpaDistrictRepository.save(district);
    }

    @Override
    public int deleteDistricts(List<String> codes) {
        jooqStreetRepository.detachedStreets(codes);
        return jpaDistrictRepository.deleteByCodeIn(codes);
    }

    @Override
    public List<District> getListDistrictsByStructure(String code, StructureType structureType) {
        List<District> districts = null;
            switch (structureType) {
                case AGENCY:
                    districts = jpaDistrictRepository.findAllByAgency_Code(code);
                    break;
                case CENTER:
                    districts = jpaDistrictRepository.findAllByAgency_Center_Code(code);
                    break;
                case UNIT:
                    districts = jpaDistrictRepository.findAllByAgency_Center_Unit_Code(code);
                    break;
            }

        return districts;
    }
}
