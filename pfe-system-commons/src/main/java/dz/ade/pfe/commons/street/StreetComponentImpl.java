package dz.ade.pfe.commons.street;

import com.google.common.collect.Lists;
import dz.ade.pfe.domain.admin.StructureType;
import dz.ade.pfe.domain.commons.Street;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
@Component
class StreetComponentImpl implements StreetComponent {

    private JpaStreetRepository jpaStreetRepository;

    public StreetComponentImpl(JpaStreetRepository jpaStreetRepository){
        this.jpaStreetRepository = jpaStreetRepository;
    }

    @Override
    public List<Street> getStreetByDistrict(String code) {
        return Lists.newArrayList(jpaStreetRepository.findOneByStreetCode(code));
    }

    @Override
    public Optional<Street> getStreet(String code) {
        return jpaStreetRepository.findOneByCode(code);
    }

    @Override
    public Set<Street> getStreetsByCodes(List<String> codes) {
        return jpaStreetRepository.findByCodeIn(codes);
    }

    public List<Street> getStreets() {
        return jpaStreetRepository.findAll();
    }

    @Override
    public Street saveStreet(Street street) {
        return jpaStreetRepository.save(street);
    }

    @Override
    public Street updateStreet(Street street) {
        return jpaStreetRepository.save(street);
    }

    @Override
    public int deleteStreets(List<String> codes) {
        return jpaStreetRepository.deleteByCodeIn(codes);
    }

    @Override
    public List<Street> getListStreetsByStructure(String code, StructureType structureType) {
        List<Street> streets = null;
        switch (structureType) {
            case AGENCY:
                streets = jpaStreetRepository.findAllByDistrict_Agency_Code(code);
                break;
            case CENTER:
                streets = jpaStreetRepository.findAllByDistrict_Agency_Center_Code(code);
                break;
            case UNIT:
                streets = jpaStreetRepository.findAllByDistrict_Agency_Center_Unit_Code(code);
                break;
        }

        return streets;
    }
}
