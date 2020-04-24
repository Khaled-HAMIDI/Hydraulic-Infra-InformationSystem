package dz.ade.pfe.ouvrage.inventory.user;

import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.port.out.user.loadbyusername.LoadUserByUsername;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
@RequiredArgsConstructor
public class UserPersistenceAdapter implements LoadUserByUsername {
    private final UserComponent userComponent;
    @Override
    public Optional<User> loadUserByUsername(String username) {
        return userComponent.findNotDeletedByUsername(username);
    }
}
