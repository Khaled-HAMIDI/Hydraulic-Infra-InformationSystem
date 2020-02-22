package dz.ade.pfe.admin.organisationalstructures;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class JooqOrganisationalStructureRepositoryImpl implements JooqOrganisationalStructureRepository {

    private DSLContext dsl;

    public JooqOrganisationalStructureRepositoryImpl(DSLContext dsl) {
        this.dsl = dsl;
    }

    @Override
    public int detachHeadsOfOrganisationalStructure(List<String> usernames) {
        return 0;
    }
}
