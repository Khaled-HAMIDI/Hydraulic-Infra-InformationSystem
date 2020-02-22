package dz.ade.pfe.admin.security.authority;

import dz.ade.pfe.domain.admin.Authority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
class AuthorityComponentImpl implements AuthorityComponent {

    private AuthorityRepository authorityRepository;

    public AuthorityComponentImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    public List<Authority> findAll() {
        return authorityRepository.findAll();
    }

    @Override
    public Optional<Authority> getAuthorityByAuthorityName(String authority) {
        return authorityRepository.findOneByAuthority(authority);
    }

    @Override
    public Set<Authority> getAuthoritiesByAuthorityNames(List<String> authorities) {
        return authorityRepository.finAllAuthorities(authorities);
    }
}
