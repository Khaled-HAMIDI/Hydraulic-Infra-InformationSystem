package dz.ade.pfe.web.admin.role.mapper;
import dz.ade.pfe.domain.admin.Role;
import dz.ade.pfe.web.admin.role.dto.RoleDto;
import dz.ade.pfe.web.admin.role.dto.RoleNoAuthDto;
import dz.ade.pfe.web.admin.role.dto.RoleShowDto;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses = AuthorityToAuthorityRoleDtoMapper.class)
public interface RoleToRoleDtoMapper {

    @Mappings({
            @Mapping(source = "role", target = "id"),
            @Mapping(target = "creationDate", dateFormat = "yyyy-MM-dd"),
            @Mapping(target = "lastModifiedDate", dateFormat = "yyyy-MM-dd")
    })
    @Named("toRoleDto")
    RoleDto roleToRoleDto(Role roleObj);

    @Mappings({
            @Mapping(source = "role", target = "id"),
            @Mapping(target = "creationDate", dateFormat = "yyyy-MM-dd"),
            @Mapping(target = "lastModifiedDate", dateFormat = "yyyy-MM-dd")
    })
    @Named("toRoleShowDto")
    RoleShowDto roleToRoleShowDto(Role roleObj);

    @Mappings({
            @Mapping(source = "role", target = "id"),
            @Mapping(source = "designation", target = "designation")
    })
    @Named("toRoleNoAuthDto")
    RoleNoAuthDto roleToRoleNoAuthDto(Role roleObj);

    @IterableMapping(qualifiedByName = "toRoleShowDto")
    List<RoleShowDto> rolesToRolesShowDto(List<Role> roles);

    @IterableMapping(qualifiedByName = "toRoleDto")
    List<RoleDto> rolesToRolesDto(Set<Role> roles);

    @IterableMapping(qualifiedByName = "toRoleNoAuthDto")
    List<RoleNoAuthDto> rolesToRolesNoAuthDto(Set<Role> roles);
}
