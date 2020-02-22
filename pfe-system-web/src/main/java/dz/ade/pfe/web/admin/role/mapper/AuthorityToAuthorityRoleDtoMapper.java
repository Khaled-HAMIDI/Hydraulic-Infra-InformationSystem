package dz.ade.pfe.web.admin.role.mapper;

import dz.ade.pfe.domain.admin.Authority;
import dz.ade.pfe.web.admin.role.dto.AuthorityDto;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface AuthorityToAuthorityRoleDtoMapper {

    default List<String> authoritiesToStrings(Set<Authority> authorities){
        return authorities.stream().map(Authority::getDescription)
                .collect(Collectors.toList());
    }

    @Mappings({
            @Mapping(source = "authority", target = "id")
    })
    @Named("toAuthorityDto")
    AuthorityDto authorityToAuthorityDto(Authority authorityObj);

    @IterableMapping(qualifiedByName = "toAuthorityDto")
    List<AuthorityDto> authoritiesToAuthoritiesDto(Set<Authority> authorities);

    @IterableMapping(qualifiedByName = "toAuthorityDto")
    List<AuthorityDto> authoritiesToAuthoritiesDto(List<Authority> authorities);
}
