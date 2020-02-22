package dz.ade.pfe.admin.security.role;

import dz.ade.pfe.admin.security.authority.AuthorityComponent;
import dz.ade.pfe.domain.admin.Authority;
import dz.ade.pfe.domain.admin.Role;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
class RoleComponentImpl implements RoleComponent {

    private RoleRepository roleRepository;
    private AuthorityComponent authorityComponent;

    public RoleComponentImpl(RoleRepository roleRepository, AuthorityComponent authorityComponent) {
        this.roleRepository = roleRepository;
        this.authorityComponent = authorityComponent;
    }

    @Override
    public List<Role> findAllNonDeleted() {
        return roleRepository.findByDeleted(false);
    }

    @Override
    public Optional<Role> getRoleByRoleName(String role) {
        return roleRepository.findOneByRole(role);
    }

    @Override
    public Optional<Role> findNotDeletedByRoleName(String role) {
        return roleRepository.findByRoleAndDeleted(role, false);
    }


    @Override
    public Role saveRole(Role role) {
        try {
            return roleRepository.save(role);
        } catch (DataIntegrityViolationException ex) {
            Role r = new Role();
            r.setRole("DataIntegrityViolationException");
            return r;
        }
    }

    @Override
    public Set<Authority> convertStringsToAuthorities(List<String> authorities) {
        Set<Authority> authoritiesByAuthorityNames = authorityComponent.getAuthoritiesByAuthorityNames(authorities);

        if (authorities.size() != authoritiesByAuthorityNames.size()) return new LinkedHashSet<>();

        return authoritiesByAuthorityNames;
    }

    @Override
    public int deleteRoles(List<String> roles) {
        return roleRepository.deleteRoles(roles);
    }

    @Override
    public Set<Role> getRolesByRoleNames(List<String> roles) {
        return roleRepository.finAllRoles(roles);
    }
}
