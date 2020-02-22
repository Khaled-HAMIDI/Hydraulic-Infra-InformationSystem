package dz.ade.pfe.admin.security.authority;

import dz.ade.pfe.domain.admin.Authority;

import java.util.List;
import java.util.Optional;
import java.util.Set;

interface AuthorityRepository {

    List<Authority> findAll();

    Set<Authority> finAllAuthorities(List<String> authorities);

    Optional<Authority> findOneByAuthority(String authority);
}
