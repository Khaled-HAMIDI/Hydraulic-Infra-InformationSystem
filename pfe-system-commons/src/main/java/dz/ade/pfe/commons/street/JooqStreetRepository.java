package dz.ade.pfe.commons.street;

import java.util.List;

public interface JooqStreetRepository {

    int detachedStreets(List<String> districtCodes);
}
