package dz.ade.pfe.admin.security.user;

import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.domain.exceptions.ActionNotAllowedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import serilogj.Log;

@Service
class SecurityServiceImpl implements SecurityService {

    @Value("${app.security.default-password}")
    private String defaultPassword;

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public SecurityServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();

        Log.debug("Changing password for user {username}", username);

        User user = userRepository
                .findOneByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("No user found with username '%s'.", username)));

        if (!passwordEncoder.matches(oldPassword,user.getPassword())) {
            throw new ActionNotAllowedException("Old Password not correct !");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void resetPassword(User user) {
        Log.debug("Resetting password for user {%s}", user.getUsername());
        user.setPassword(passwordEncoder.encode(defaultPassword));
        userRepository.save(user);
    }

    @Override
    public boolean isPasswordChanged(User user) {
        return !passwordEncoder.matches(defaultPassword, user.getPassword());
    }

    @Override
    public String getDefaultPassword() {
        return passwordEncoder.encode(defaultPassword);
    }
}
