package dz.ade.pfe.admin.security.user;

import java.util.List;

interface JooqUserRepository {

    int disableUsersByOrganisationalStructureCodes(List<String> codes);
}
