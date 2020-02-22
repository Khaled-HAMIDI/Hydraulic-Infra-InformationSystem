package dz.ade.pfe.web.security.controller;

import dz.ade.pfe.admin.security.user.SecurityService;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.user.dto.StructureTokenDto;
import dz.ade.pfe.web.admin.user.mapper.OrganisationalStructureDtoMapper;
import dz.ade.pfe.domain.exceptions.TokenNotRefreshableException;
import dz.ade.pfe.domain.exceptions.UserNotAuthorizedException;
import dz.ade.pfe.web.security.auth.JwtAuthenticationRequest;
import dz.ade.pfe.web.security.auth.TokenHelper;
import dz.ade.pfe.web.security.dto.PasswordChangerDto;
import dz.ade.pfe.web.security.dto.UserTokenState;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/auth")
@Api(value = "Authentication", description = "Authentication operations")
public class AuthenticationController {

    private TokenHelper tokenHelper;
    private AuthenticationManager authenticationManager;
    private SecurityService securityService;
    private OrganisationalStructureDtoMapper organisationalStructureDtoMapper;

    public AuthenticationController(TokenHelper tokenHelper,
                                    AuthenticationManager authenticationManager,
                                    SecurityService securityService,
                                    OrganisationalStructureDtoMapper organisationalStructureDtoMapper) {
        this.tokenHelper = tokenHelper;
        this.authenticationManager = authenticationManager;
        this.securityService = securityService;
        this.organisationalStructureDtoMapper = organisationalStructureDtoMapper;
    }

    @PostMapping(value = "/login")
    @ApiOperation(value = "Generate token for user")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully generated the token"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public UserTokenState generateToken(@RequestBody JwtAuthenticationRequest authenticationRequest) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        List<String> perms = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        List<String> roles = user.getRoles().stream()
                .map(Role::getRole)
                .collect(Collectors.toList());

        StructureTokenDto structureTokenDto =
                organisationalStructureDtoMapper.structToOrganisationalTokenDto(user.getOrganisationalStructure());

        boolean isPasswordChanged = securityService.isPasswordChanged(user);

        String jws = tokenHelper.generateToken(user.getUsername(), perms, roles, structureTokenDto, isPasswordChanged,
                user.getFirstName() + " " + user.getLastName(), user.getEmail());
        long expiresIn = tokenHelper.getExpiredIn();

        return new UserTokenState(jws, expiresIn);
    }

    @PostMapping(value = "/refresh-token")
    @ApiOperation(value = "Refresh token for user")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully refreshed the token"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public UserTokenState refreshToken(HttpServletRequest request) {
        Optional<String> authToken = tokenHelper.getToken(request);

        if (!authToken.isPresent()) {
            throw new UserNotAuthorizedException("Full authentication is required to access this resource");
        }

        if (!tokenHelper.isTokenRefreshable(authToken.get())) {
            throw new TokenNotRefreshableException(String.format("Token not acceptable for refresh {Token %s}", authToken.get()));
        }

        String refreshedToken = tokenHelper.generateRefreshToken(authToken.get());
        long expiresIn = tokenHelper.getExpiredIn();

        return new UserTokenState(refreshedToken, expiresIn);
    }

    @PostMapping(value = "/change-password")
    @ApiOperation(value = "Change a password for user")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully changed the password"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public void changePassword(@RequestBody PasswordChangerDto passwordChangerDto) {
        securityService.changePassword(passwordChangerDto.getCurrentPassword(),
                passwordChangerDto.getNewPassword());
    }
}
