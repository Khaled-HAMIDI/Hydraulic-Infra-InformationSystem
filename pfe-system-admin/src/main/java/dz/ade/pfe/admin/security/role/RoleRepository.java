package dz.ade.pfe.admin.security.role;

import dz.ade.pfe.domain.admin.Role;

import java.util.List;
import java.util.Optional;
import java.util.Set;

interface RoleRepository {
    List<Role> findByDeleted(Boolean deleted);

    Optional<Role> findOneByRole(String role);

    Optional<Role> findByRoleAndDeleted(String role, Boolean deleted);

    Role save(Role role);

    Set<Role> finAllRoles(List<String> roles);

    int deleteRoles(List<String> role);
}
