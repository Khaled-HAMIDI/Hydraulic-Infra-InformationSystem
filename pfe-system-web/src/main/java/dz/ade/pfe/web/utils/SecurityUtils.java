package dz.ade.pfe.web.utils;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.exceptions.UserNotAuthorizedException;
import dz.ade.pfe.web.security.auth.TokenHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SecurityUtils {

    private final TokenHelper tokenHelper;

    public List<String> getConnectedUserRoles(HttpServletRequest httpServletRequest) {
        String authToken = tokenHelper.getToken(httpServletRequest)
                .orElseThrow(() -> new UserNotAuthorizedException("Full authentication is required to access this resource"));

        return tokenHelper.getRolesFromToken(authToken);
    }

    public String getConnectedUserOrganisationalStructure(HttpServletRequest httpServletRequest) {
        String token = getToken(httpServletRequest);
        return tokenHelper.getOrganisationelStructureFromToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("user not affected to structure"));
    }

    public String getUsername(HttpServletRequest httpServletRequest) {
        String token = getToken(httpServletRequest);
        return tokenHelper.getUsernameFromToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("username not found"));
    }

    public String getToken(HttpServletRequest httpServletRequest) {
        return tokenHelper.getToken(httpServletRequest)
                .orElseThrow(() -> new UserNotAuthorizedException("Full authentication is required to access this resource"));
    }
}