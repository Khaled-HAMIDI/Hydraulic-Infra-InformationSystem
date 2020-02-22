package dz.ade.pfe.commons.district;

import dz.ade.pfe.domain.admin.StructureType;
import dz.ade.pfe.domain.commons.District;
import dz.ade.pfe.domain.commons.Street;

import java.util.List;
import java.util.Optional;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
public interface DistrictComponent {

    List<District> getDistricts(String code);

    Optional<District> getDistrictByCode(String code);

    District saveDistrict(District district);

    District updateDistrict(District district);

    int deleteDistricts(List<String> codes);

    List<District> getListDistrictsByStructure(String code, StructureType structureType);
}
