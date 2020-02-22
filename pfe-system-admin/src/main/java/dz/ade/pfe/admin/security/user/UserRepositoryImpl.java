package dz.ade.pfe.admin.security.user;

import dz.ade.pfe.admin.organisationalstructures.TestUser;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.domain.admin.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepositoryImpl extends UserRepository, JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.roles r JOIN FETCH r.authorities a WHERE u.username = :username")
    Optional<User> findOneByUsernameWithCredentials(String username);

    Optional<User> findOneByUsername(String username);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndDeleted(String username, Boolean deleted);

    Optional<User> findByEmployeeCodeAndDeleted(String employee_code, Boolean deleted);

    @Query(value = "SELECT u FROM User u WHERE ( username = ?1 OR employeeCode = ?2 ) AND deleted = false ")
    Optional<User> findByUsernameOrEmployeeCodeAndNotDeleted(String username, String employee_code);

    Optional<User> findById(Long id);

    Optional<User> findByEmployeeCode(String employeeCode);

    List<User> findByDeleted(boolean deleted);

    @Transactional
    @Modifying
    @Query(value = "UPDATE User SET deleted = true, enabled = false, deletedDate = CURRENT_TIMESTAMP WHERE username IN ?1 AND deleted = false")
    int deleteUsers(List<String> users);

    @Query(value = "SELECT u FROM User u LEFT JOIN OrganisationalStructure o ON u.organisationalStructure.id = o.id " +
            "WHERE o.code = :code AND u.deleted = false ")
    List<User> findAllUsersByOrganisationalStructureCode(@Param("code") String code);

    @Query(value = "SELECT new dz.ade.pfe.admin.organisationalstructures.TestUser(u.organisationalStructure.code, count(u)) " +
            "from User u " +
            "where exists (select r from u.roles r where r.role = :role) " +
            "and u.organisationalStructure.code in (select a.code from Agency a where a.code IN (:agencyCodes)) " +
            "group by u.organisationalStructure.code")
    List<TestUser> getUsersByProfileGroupByAgency(List<String> agencyCodes, String role);

    int countUserByOrganisationalStructure_CodeAndRolesContains(String code, Role role);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.deleted = :deleted AND r.role IN (:roles)")
    List<User> findAllByDeletedAndRolesRoleIn(Boolean deleted, List<String> roles);

    @Query(value = "SELECT u FROM User u WHERE u.username IN :usernames AND u.deleted = false")
    List<User> findAllUserByUsername(@Param("usernames") List<String> usernames);

    @Query(value = "SELECT u FROM User u WHERE exists (select r from u.roles r where r.role = :role) " +
            "AND u.organisationalStructure.code = :code AND u.deleted = false ")
    List<User> findAllUsersByOrganisationalStructureCodeAndRole(@Param("code") String code, @Param("role") String role);

    @Query(value = "SELECT u FROM User u WHERE exists (select r from u.roles r where r.role = :role) " +
            "AND u.username = :username AND u.deleted = false ")
    Optional<User> findUserByUsernameAndRole(@Param("username") String username, @Param("role") String role);
}
