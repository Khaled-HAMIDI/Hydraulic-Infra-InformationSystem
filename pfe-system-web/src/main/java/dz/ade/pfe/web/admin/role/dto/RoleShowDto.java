package dz.ade.pfe.web.admin.role.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleShowDto {
    private String id;
    @NotBlank
    private String role;
    @NotBlank
    private String designation;
    private String creationDate;
    private String lastModifiedDate;
    @NotEmpty
    private List<@NotBlank String> authorities;
    private Boolean systemEntity;
}
