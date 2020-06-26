package dz.ade.pfe.admin.security.user;

import dz.ade.pfe.admin.organisationalstructures.TestUser;
import dz.ade.pfe.admin.security.role.RoleComponent;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.domain.admin.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import serilogj.Log;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class UserComponentImpl implements UserComponent, UserDetailsService {

    private UserRepository userRepository;
    private RoleComponent roleComponent;
    private JooqUserRepository jooqUserRepository;

    public UserComponentImpl(UserRepository userRepository,
                             RoleComponent roleComponent,
                             JooqUserRepository jooqUserRepository) {
        this.userRepository = userRepository;
        this.roleComponent = roleComponent;
        this.jooqUserRepository = jooqUserRepository;
    }

    @Override
    public User createUser(User user) {
        user.setDeleted(false);
        user = userRepository.save(user);
        return user;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findOneByUsernameWithCredentials(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("No user found with username '%s'.", username)));
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }

    @Override
    public Optional<User> findNotDeletedByUsername(String username) {
        return userRepository.findByUsernameAndDeleted(username, false);
    }

    @Override
    public Optional<User> findNotDeletedByEmployeeCode(String employee_code) {
        return userRepository.findByEmployeeCodeAndDeleted(employee_code, false);
    }

    @Override
    public Optional<User> findByUsernameOrEmployeeCode(String username, String employee_code) {
        return this.userRepository.findByUsernameOrEmployeeCodeAndNotDeleted(username, employee_code);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("No user found with id '%s'.", id)));
    }

    public List<User> findAllNonDeleted() {
        return userRepository.findByDeleted(false);
    }

    @Override
    public List<User> getPersonnel(String code) {
        return userRepository.getPersonnels(code);
    }

    @Override
    public List<User> findUsersByRoles(List<String> roles) {
        return userRepository.findAllByDeletedAndRolesRoleIn(false, roles);
    }

    @Override
    public Set<Role> convertStringsToRoles(List<String> roles) {
        Set<Role> rolesByName = roleComponent.getRolesByRoleNames(roles);

        List<String> rolesExist = rolesByName.stream()
                .map(Role::getRole)
                .collect(Collectors.toList());

        List<String> rolesDiff = roles.stream()
                .filter(r -> !rolesExist.contains(r))
                .collect(Collectors.toList());

        if (!rolesDiff.isEmpty()) {
            Log.information("Roles {@rolesDiff} diff", rolesDiff);
        }

        return rolesByName;
    }

    @Override
    public String getUsernameFromEmail(String email) {
        return email.substring(0, email.indexOf("@"));
    }

    @Override
    public int deleteUsers(List<String> users) {
        return userRepository.deleteUsers(users);
    }

    @Override
    public List<User> getOrganisationalStructureUsers(String code) {
        return userRepository.findAllUsersByOrganisationalStructureCode(code);
    }

    @Override
    public int getUserRoleCount(String code, Role role) {
        return userRepository.countUserByOrganisationalStructure_CodeAndRolesContains(code, role);
    }

    @Override
    public int disableUsersByOrganisationalStructureCodes(List<String> codes) {
        return jooqUserRepository.disableUsersByOrganisationalStructureCodes(codes);
    }

    @Override
    public Optional<User> getUserByEmployeeCode(String code) {
        return userRepository.findByEmployeeCode(code);
    }

    @Override
    public List<User> getAllUserByUsername(List<String> usernames) {
        return userRepository.findAllUserByUsername(usernames);
    }

    @Override
    public List<User> getUsersByOrganisationalStructureCodeAndRole(String organisationalStructureCode, String role) {
        return  userRepository.findAllUsersByOrganisationalStructureCodeAndRole(organisationalStructureCode, role);
    }

    @Override
    public Optional<User> getUserByUsernameAndRole(String username, String role) {
        return userRepository.findUserByUsernameAndRole(username, role);
    }
}
