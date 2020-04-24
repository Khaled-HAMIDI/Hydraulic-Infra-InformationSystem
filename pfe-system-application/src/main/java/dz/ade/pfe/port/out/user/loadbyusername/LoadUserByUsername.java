package dz.ade.pfe.port.out.user.loadbyusername;

import dz.ade.pfe.domain.admin.User;

import java.util.Optional;

public interface LoadUserByUsername {
    Optional<User> loadUserByUsername(String username);
}
