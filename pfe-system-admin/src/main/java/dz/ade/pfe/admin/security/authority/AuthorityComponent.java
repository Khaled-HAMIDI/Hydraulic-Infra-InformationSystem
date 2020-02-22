package dz.ade.pfe.admin.security.authority;

import dz.ade.pfe.domain.admin.Authority;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AuthorityComponent {
    List<Authority> findAll();

    Optional<Authority> getAuthorityByAuthorityName(String authority);

    Set<Authority> getAuthoritiesByAuthorityNames(List<String> authorities);
}
