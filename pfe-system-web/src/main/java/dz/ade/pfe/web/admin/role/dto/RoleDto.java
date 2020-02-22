package dz.ade.pfe.web.admin.role.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private String id;
    private String role;
    private String designation;
    private String creationDate;
    private String lastModifiedDate;
    private List<AuthorityDto> authorities;
    private Boolean systemEntity;
}
