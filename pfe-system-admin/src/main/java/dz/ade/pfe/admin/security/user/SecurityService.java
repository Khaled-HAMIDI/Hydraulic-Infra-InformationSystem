package dz.ade.pfe.admin.security.user;

import dz.ade.pfe.domain.admin.User;

public interface SecurityService {

    void changePassword(String oldPassword, String newPassword);

    void resetPassword(User user);

    boolean isPasswordChanged(User user);

    String getDefaultPassword();
}
