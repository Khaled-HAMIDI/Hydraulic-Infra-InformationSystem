package dz.ade.pfe.admin.security.role;

import dz.ade.pfe.domain.admin.Authority;
import dz.ade.pfe.domain.admin.Role;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface RoleComponent {
    List<Role> findAllNonDeleted();

    Optional<Role> getRoleByRoleName(String role);

    Optional<Role> findNotDeletedByRoleName(String role);

    Role saveRole(Role role);

    Set<Authority> convertStringsToAuthorities(List<String> authorities);

    int deleteRoles(List<String> roles);

    Set<Role> getRolesByRoleNames(List<String> roles);
}
