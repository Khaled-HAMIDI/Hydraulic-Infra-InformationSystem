package dz.ade.pfe.web.admin.authority.controller;

import dz.ade.pfe.admin.security.authority.AuthorityComponent;
import dz.ade.pfe.domain.admin.Authority;
import dz.ade.pfe.web.admin.authority.dto.AuthorityDto;
import dz.ade.pfe.web.admin.authority.mapper.AuthorityToAuthorityDtoMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/authorities")
@Api(value = "Users", description = "Operations on authorities")
public class AuthorityController {

    private AuthorityComponent authorityComponent;
    private AuthorityToAuthorityDtoMapper authorityToAuthorityDtoMapper;

    public AuthorityController(AuthorityComponent authorityComponent, AuthorityToAuthorityDtoMapper authorityToAuthorityDtoMapper) {
        this.authorityComponent = authorityComponent;
        this.authorityToAuthorityDtoMapper = authorityToAuthorityDtoMapper;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ApiOperation(value = "View a list of available authorities")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of roles"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<AuthorityDto> loadAll() {
        List<Authority> authorities = authorityComponent.findAll();
        return authorityToAuthorityDtoMapper.authoritiesToAuthoritiesDto(authorities);
    }
}
