package dz.ade.pfe.web.utils;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.exceptions.UserNotAuthorizedException;
import dz.ade.pfe.web.security.auth.TokenHelper;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

public class SecurityUtils {

    public static List<String> getConnectedUserRoles(HttpServletRequest httpServletRequest, TokenHelper tokenHelper) {
        Optional<String> authToken = tokenHelper.getToken(httpServletRequest);
        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }

        return tokenHelper.getRolesFromToken(authToken.get());
    }

    public static String getConnectedUserOrganisationalStructure(HttpServletRequest httpServletRequest,
                                                                 TokenHelper tokenHelper) {
        String token = getToken(httpServletRequest, tokenHelper);
        Optional<String> structure = tokenHelper.getOrganisationelStructureFromToken(token);
        if (!structure.isPresent()) {
            throw new ResourceNotFoundException("user not affected to structure");
        }

        return structure.get();
    }

    public static String getUsername(HttpServletRequest httpServletRequest,
                                     TokenHelper tokenHelper) {
        String token = getToken(httpServletRequest, tokenHelper);
        Optional<String> username = tokenHelper.getUsernameFromToken(token);
        if (!username.isPresent()) {
            throw new ResourceNotFoundException("username not found");
        }

        return username.get();
    }

    public static String getToken(HttpServletRequest httpServletRequest, TokenHelper tokenHelper) {
        Optional<String> authToken = tokenHelper.getToken(httpServletRequest);
        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }
        return authToken.get();
    }
}
