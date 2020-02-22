package dz.ade.pfe.commons.street;

import dz.ade.pfe.domain.admin.StructureType;
import dz.ade.pfe.domain.commons.Street;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * @author bensalem
 * @version 1.0
 * @created 8/13/2018
 */
public interface StreetComponent {

    List<Street> getStreetByDistrict(String code);

    Optional<Street> getStreet(String code);

    Set<Street> getStreetsByCodes(List<String> codes);
    
    List<Street> getStreets();

    Street saveStreet(Street street);

    Street updateStreet(Street street);

    int deleteStreets(List<String> codes);

    List<Street> getListStreetsByStructure(String code, StructureType structureType);
}
