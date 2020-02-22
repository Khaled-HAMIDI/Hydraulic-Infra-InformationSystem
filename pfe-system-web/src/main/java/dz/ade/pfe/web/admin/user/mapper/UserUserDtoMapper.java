package dz.ade.pfe.web.admin.user.mapper;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.domain.admin.User;
import dz.ade.pfe.web.admin.role.mapper.RoleToRoleDtoMapper;
import dz.ade.pfe.web.admin.user.dto.OrganisationalStructureUserDto;
import dz.ade.pfe.web.admin.user.dto.UserAddDto;
import dz.ade.pfe.web.admin.user.dto.UserDto;
import dz.ade.pfe.web.admin.user.dto.UserListDto;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {RoleToRoleDtoMapper.class, OrganisationalStructureDtoMapper.class})
public interface UserUserDtoMapper {

    @Mappings({
            @Mapping(target = "organisationalStructure", ignore = true)
    })
    User userDtoToUser(UserDto userDto);

    @Mappings({
            @Mapping(target = "organisationalStructure", ignore = true),
            @Mapping(target = "roles", ignore = true)
    })
    User userDtoToUserWithTarget(UserAddDto userAddDto, @MappingTarget User user);

    @Mappings({
            @Mapping(source = "username", target = "id"),
            @Mapping(source = "username", target = "username"),
            @Mapping(source = "organisationalStructure", target = "structure")
    })
    UserDto userToUserDto(User user);

    @Mappings({
            @Mapping(source = "username", target = "id"),
            @Mapping(source = "username", target = "username")
    })
    OrganisationalStructureUserDto userToOrganisationalStructureUserDto(User user);

    @Mappings({
            @Mapping(source = "username", target = "id"),
            @Mapping(source = "username", target = "username"),
            @Mapping(source = "organisationalStructure.designation", target = "structure")
    })
    @Named("toUserShowDto")
    UserListDto userToUserShowDto(User user);

    @IterableMapping(qualifiedByName = "toUserShowDto")
    List<UserListDto> usersToUsersShowDto(List<User> user);

    default List<String> rolesToString(Set<Role> roles){
        return roles.stream().map(
                Role::getDesignation
        ).collect(Collectors.toList());
    }

    @Mapping(target = "roles", ignore = true)
    User userAddDtoToUser(UserAddDto userAddDto);
}
