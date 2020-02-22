package dz.ade.pfe.commons.street;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class JooqStreetRepositoryImpl implements JooqStreetRepository {

    private DSLContext dsl;

    public JooqStreetRepositoryImpl(DSLContext dsl) {
        this.dsl = dsl;
    }


    @Override
    public int detachedStreets(List<String> districtCodes) {
        return 0;
    }
}