package dz.ade.pfe.admin.security.role;

import dz.ade.pfe.domain.admin.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
interface RoleRepositoryImpl extends RoleRepository, JpaRepository<Role, Long> {

    List<Role> findByDeleted(Boolean deleted);

    Optional<Role> findOneByRole(String role) ;

    Optional<Role> findByRoleAndDeleted(String role, Boolean deleted);

    Role save(Role role);

    @Query("SELECT role FROM Role role WHERE role.role IN :roles")
    Set<Role> finAllRoles(@Param("roles") List<String> roles);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Role SET deleted = true, deletedDate = CURRENT_TIMESTAMP WHERE role IN ?1 AND systemEntity = false")
    int deleteRoles(List<String> role);
}
