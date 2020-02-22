package dz.ade.pfe.web.admin.role.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleNoAuthDto {
    private String id;
    private String role;
    private String designation;
}
