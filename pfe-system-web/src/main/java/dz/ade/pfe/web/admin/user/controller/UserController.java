package dz.ade.pfe.web.admin.user.controller;

import dz.ade.pfe.admin.security.user.SecurityService;
import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.admin.*;
import dz.ade.pfe.web.admin.user.dto.*;
import dz.ade.pfe.web.admin.user.mapper.OrganisationalStructureDtoMapper;
import dz.ade.pfe.web.admin.user.mapper.UserUserDtoMapper;
import dz.ade.pfe.domain.exceptions.WrongFormatException;
import dz.ade.pfe.web.commons.controller.BaseController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;
import serilogj.Log;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api")
@Api(value = "Users")
@RequiredArgsConstructor
public class UserController extends BaseController {

    private final UserComponent userComponent;
    private final SecurityService securityService;
    private final UserUserDtoMapper userUserDtoMapper;
    private final OrganisationalStructureDtoMapper organisationalStructureDtoMapper;

    @PostMapping(value = "/users")
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Create new user")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successfully created a user"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public UserDto createUser(@Valid @RequestBody UserAddDto userAddDto) {
        String username = userComponent.getUsernameFromEmail(userAddDto.getEmail());
        Optional<User> optionalUser = userComponent.findByUsernameOrEmployeeCode(username, userAddDto.getEmployeeCode());
        if (optionalUser.isPresent()) {
            throw new ResourceAlreadyExistException(String.format("There is already a user with given username %s or employee code %s", username, userAddDto.getEmployeeCode()));
        }

        User user = userUserDtoMapper.userAddDtoToUser(userAddDto);
        user.setUsername(username);

        OrganisationalStructure foundStr;
        if (userAddDto.getStructure() != null) {
            foundStr = organisationalStructureComponent.getStructure(userAddDto.getStructure())
                    .orElseThrow(() -> new ResourceNotFoundException("Structure with code=" + userAddDto.getStructure() + " does not exists"));
        } else {
            foundStr = getDeployedUnit();
        }

        user.setOrganisationalStructure(foundStr);
        user.setRoles(userComponent.convertStringsToRoles(userAddDto.getRoles()));
        user.setPassword(securityService.getDefaultPassword());
        User createdUser = userComponent.createUser(user);
        return userUserDtoMapper.userToUserDto(createdUser);
    }

    @GetMapping(value = "/organisationalStructure/{code}/users")
    @ApiOperation(value = "View the list of users to be heads of the structure")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of users to be heads of the structure"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<OrganisationalStructureUserDto> getAllHeadsByOrganisationalStructure(@PathVariable String code) {
        return userComponent
                .getOrganisationalStructureUsers(code).stream()
                .map(user -> userUserDtoMapper.userToOrganisationalStructureUserDto(user))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/users")
    //@PreAuthorize("hasAnyAuthority('*:*', 'SHOW')")
    @ApiOperation(value = "View a list of available users")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of users"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<UserListDto> loadAll() {
        List<User> users = userComponent.findAllNonDeleted();
        return userUserDtoMapper.usersToUsersShowDto(users);
    }

    @GetMapping(value = "/users/inventory")
    @ApiOperation(value = "View a list of available users")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a list of users"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public List<UserListDto> loadAllForInventory() {
        List<User> users = userComponent.findAllNonDeleted();
        return userUserDtoMapper.userToUserShowDtoForInventory(users);
    }

    @GetMapping(value = "/users/{userName}")
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Search for a user with a UserName")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a user"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public UserDto getUser(@PathVariable String userName) {
        Optional<User> userOpt = userComponent.findNotDeletedByUsername(userName);
        if (!userOpt.isPresent()) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", userName));
        }
        User user = userOpt.get();
        UserDto userDto = userUserDtoMapper.userToUserDto(user);
        StructureType structureType = user.getOrganisationalStructure().getStructureType();
        if (StructureType.CENTER.equals(structureType)) {
            Optional<Unit> unit = organisationalStructureComponent.getUnitByCenterCode(user.getOrganisationalStructure().getCode());
            if (!unit.isPresent()) {
                Log.error("This center has no unit.");
            }
            Unit org = unit.get();
            StructureDto parentDto = organisationalStructureDtoMapper.organisationalStructureToOrganisationalStructureDto(org);
            userDto.getStructure().setParentStructure(parentDto);
        }

        return userDto;
    }

    @DeleteMapping(value = "/users")
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Search for a user with a UserName")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved a user"),
            @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    })
    public ResponseEntity<?> deleteUser(@RequestBody List<String> users) {
        if (users.isEmpty()) {
            throw new WrongFormatException("users list selected is Empty");
        }

        int i;
        try {
            i = userComponent.deleteUsers(users);
            organisationalStructureComponent.detachHeadsOfOrganisationalStructure(users);
        } catch (Exception e) {
            throw new ResourceNotFoundException("There is problems deleting users");
        }
        Log.information("Users {@users} have been deleted", users);
        return ResponseEntity.ok(i);
    }

    @PutMapping(value = "/users/{userName}")
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Update user information")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully updated user information"),
            @ApiResponse(code = 401, message = "You are unauthorized to update user information"),
            @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
            @ApiResponse(code = 404, message = "The user you are trying to update is not found")
    })
    public UserDto updateUser(@PathVariable String userName,
                              @Valid @RequestBody UserAddDto userAddDto) {

        Optional<User> optionalUser = userComponent.findNotDeletedByUsername(userName);
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", userName));
        }

        String username = userComponent.getUsernameFromEmail(userAddDto.getEmail());
        if (!userName.equals(username)) {
            Optional<User> optUser = userComponent.findNotDeletedByUsername(username);
            if (optUser.isPresent()) {
                throw new ResourceAlreadyExistException(String.format("There is already a user with given username %s", username));
            }
        }

        if (!optionalUser.get().getEmployeeCode().equals(userAddDto.getEmployeeCode())) {
            Optional<User> optUser = userComponent.findNotDeletedByEmployeeCode(userAddDto.getEmployeeCode());
            if (optUser.isPresent()) {
                throw new ResourceAlreadyExistException(String.format("There is already a user with given employee code %s", userAddDto.getEmployeeCode()));
            }
        }

        User user = optionalUser.get();
        userUserDtoMapper.userDtoToUserWithTarget(userAddDto, user);
        user.setUsername(username);

        OrganisationalStructure foundStr;
        if (userAddDto.getStructure() != null) {
            foundStr = organisationalStructureComponent.getStructure(userAddDto.getStructure())
                    .orElseThrow(() -> new ResourceNotFoundException("Structure with code=" + userAddDto.getStructure() + " does not exists"));
        } else {
            foundStr = getDeployedUnit();
        }

        user.setOrganisationalStructure(foundStr);
        user.setRoles(userComponent.convertStringsToRoles(userAddDto.getRoles()));
        User savedUser = userComponent.saveUser(user);
        return userUserDtoMapper.userToUserDto(savedUser);
    }

    @GetMapping(value = "/users/whoami")
    @PreAuthorize("isAuthenticated()")
    @ApiOperation(value = "Get information about connected user")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully getting the current user"),
            @ApiResponse(code = 401, message = "You are not authorized to current user information"),
            @ApiResponse(code = 404, message = "Connected user not found")
    })
    public UserDto connectedUser(Principal principal) {
        return getUser(principal.getName());
    }

    @PostMapping(value = "/users/{username}/resetPassword")
    @PreAuthorize("hasAuthority('*:*')")
    @ApiOperation(value = "Resetting password")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "The password has successfully changed"),
            @ApiResponse(code = 401, message = "You don't have the authority to reset password"),
            @ApiResponse(code = 404, message = "The user you are looking for is not found")
    })
    public ResponseEntity<?> resetPassword(@PathVariable String username) {
        Optional<User> optionalUser = userComponent.findNotDeletedByUsername(username);
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        }
        try {
            securityService.resetPassword(optionalUser.get());
        } catch (Exception e) {
            throw new ResourceNotFoundException(String.format("Problem resetting password"));
        }
        return ResponseEntity.ok(1);
    }
}
