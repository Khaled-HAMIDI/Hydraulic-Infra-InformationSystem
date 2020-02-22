package dz.ade.pfe.web.admin.role.controller;

import dz.ade.pfe.admin.security.role.RoleComponent;
import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.admin.Authority;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.web.admin.role.dto.RoleDto;
import dz.ade.pfe.web.admin.role.dto.RoleShowDto;
import dz.ade.pfe.web.admin.role.mapper.RoleToRoleDtoMapper;
import dz.ade.pfe.domain.exceptions.ActionNotAllowedException;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.exceptions.WrongFormatException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/roles")
@Api(value = "Roles", description = "Operations on roles")
public class RoleController {

    private RoleComponent roleComponent;
    private RoleToRoleDtoMapper roleRoleDtoMapper;

    public RoleController(RoleComponent roleComponent, RoleToRoleDtoMapper roleRoleDtoMapper) {
        this.roleComponent = roleComponent;
        this.roleRoleDtoMapper = roleRoleDtoMapper;
    }

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasAnyAuthority('roles:list', '*:*')")
    @ApiOperation(value = "View a list of available roles")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of roles"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<RoleShowDto> loadAll() {
        List<Role> roles = roleComponent.findAllNonDeleted();
        return roleRoleDtoMapper.rolesToRolesShowDto(roles);
    }

    @GetMapping(value = "/{role}")
    @ApiOperation(value = "Search for a role with a his name")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a role"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public RoleDto getRole(@PathVariable String role) {
        Optional<Role> fetchedRole = roleComponent.findNotDeletedByRoleName(role);
        if (!fetchedRole.isPresent()) {
            throw new ResourceNotFoundException(String.format("The role  {%s} does not exists", role));
        }
        RoleDto roleDto = roleRoleDtoMapper.roleToRoleDto(fetchedRole.get());
        return roleDto;
    }

    @PostMapping
    @ApiOperation(value = "Add new role")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a role"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public RoleShowDto createRole(@Valid @RequestBody RoleShowDto roleDto) {
        Optional<Role> optRole = roleComponent.findNotDeletedByRoleName(roleDto.getRole());
        if (optRole.isPresent()) {
            throw new ResourceNotFoundException(String.format("The role '%s' already exists.", roleDto.getRole()));
        }

        Set<Authority> authorities = roleComponent.convertStringsToAuthorities(roleDto.getAuthorities());
        if (authorities.isEmpty()) {
            throw new WrongFormatException("one or more authorities not existing");
        }

        Role mappedRole = new Role();
        mappedRole.setRole(roleDto.getRole());
        mappedRole.setDesignation(roleDto.getDesignation());
        mappedRole.setAuthorities(authorities);
        Role savedRole = roleComponent.saveRole(mappedRole);
        return roleRoleDtoMapper.roleToRoleShowDto(savedRole);
    }

    @PutMapping(value = "/{role}")
    @ApiOperation(value = "Edit a role")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully edited a role"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public RoleShowDto updateRole(@PathVariable String role, @Valid @RequestBody RoleShowDto roleDto) {
        Optional<Role> roleToEdit = roleComponent.findNotDeletedByRoleName(role);
        if (!roleToEdit.isPresent()) {
            throw new ResourceNotFoundException(String.format("There is role with name : '%s'", role));
        }

        if (roleToEdit.get().getSystemEntity()) {
            throw new ActionNotAllowedException("Entity system");
        }

        if (!role.equals(roleDto.getRole())) {
            Optional<Role> optionalRole = roleComponent.findNotDeletedByRoleName(roleDto.getRole());
            if (optionalRole.isPresent()) {
                throw new ResourceAlreadyExistException(String.format("There is already a role with given role name %s", roleDto.getRole()));
            }
        }

        Set<Authority> authorities = roleComponent.convertStringsToAuthorities(roleDto.getAuthorities());
        if (authorities.isEmpty()) {
            throw new WrongFormatException("one or more authorities not existing");
        }

        Role editedRole = roleToEdit.get();
        editedRole.setRole(roleDto.getRole());
        editedRole.setDesignation(roleDto.getDesignation());
        editedRole.getAuthorities().clear();
        editedRole.getAuthorities().addAll(authorities);
        Role savedRole = roleComponent.saveRole(editedRole);
        return roleRoleDtoMapper.roleToRoleShowDto(savedRole);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Delete list of roles")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a role"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> deleteRole(@RequestBody List<String> roles) {
        if (roles.isEmpty()) {
            throw new WrongFormatException("roles list selected is Empty");
        }

        return ResponseEntity.ok(roleComponent.deleteRoles(roles));
    }
}
