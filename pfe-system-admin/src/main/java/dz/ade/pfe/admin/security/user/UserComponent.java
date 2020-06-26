package dz.ade.pfe.admin.security.user;

import dz.ade.pfe.admin.organisationalstructures.TestUser;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.domain.admin.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserComponent {

    User createUser(User user);

    User saveUser(User user);

    User findById(Long id);

    UserDetails loadUserByUsername(String username);

    Optional<User> findByUsername(String username);

    Optional<User> findNotDeletedByUsername(String username);

    Optional<User> findNotDeletedByEmployeeCode(String employee_code);

    Optional<User> findByUsernameOrEmployeeCode(String username, String employee_code);

    List<User> findAllNonDeleted();

    List<User> getPersonnel(String code);

    List<User> findUsersByRoles(List<String> roles);

    List<User> getAllUserByUsername(List<String> usernames);

    Set<Role> convertStringsToRoles(List<String> roles);

    String getUsernameFromEmail(String email);

    int deleteUsers(List<String> users);

    List<User> getOrganisationalStructureUsers(String code);

    int getUserRoleCount(String code, Role role);

    int disableUsersByOrganisationalStructureCodes(List<String> codes);

    Optional<User> getUserByEmployeeCode(String code);

    List<User> getUsersByOrganisationalStructureCodeAndRole(String organisationalStructureCode, String role);

    Optional<User> getUserByUsernameAndRole(String username, String role);
}
