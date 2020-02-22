package dz.ade.pfe.admin.security.user;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
class JooqUserRepositoryImpl implements JooqUserRepository {

    private DSLContext dsl;

    public JooqUserRepositoryImpl(DSLContext dsl) {
        this.dsl = dsl;
    }

    @Override
    public int disableUsersByOrganisationalStructureCodes(List<String> codes) {
        return 0;
    }
}
