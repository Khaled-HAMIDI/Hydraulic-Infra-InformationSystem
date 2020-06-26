package dz.ade.pfe.admin.security.user;

import dz.ade.pfe.admin.organisationalstructures.TestUser;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.domain.admin.User;

import java.util.Date;
import java.util.List;
import java.util.Optional;

interface UserRepository {

    Optional<User> findOneByUsernameWithCredentials(String username);

    Optional<User> findOneByUsername(String username);

    Optional<User> findByUsernameAndDeleted(String username, Boolean deleted);

    Optional<User> findByEmployeeCodeAndDeleted(String employee_code, Boolean deleted);

    Optional<User> findByUsernameOrEmployeeCodeAndNotDeleted(String username, String employee_code);

    User save(User user);

    Optional<User> findById(Long id);

    List<User> findByDeleted(boolean deleted);

    List<User> findAllUserByUsername(List<String> usernames);

    int deleteUsers(List<String> users);

    List<User> findAllUsersByOrganisationalStructureCode(String code);

    int countUserByOrganisationalStructure_CodeAndRolesContains(String code, Role role);

    Optional<User> findByEmployeeCode(String employeeCode);

    List<User> findAllByDeletedAndRolesRoleIn(Boolean deleted, List<String> roles);

    List<User> findAllUsersByOrganisationalStructureCodeAndRole(String organisationalStructureCode, String role);

    Optional<User> findUserByUsernameAndRole(String username, String role);

    List<User> getPersonnels (String code);
}
