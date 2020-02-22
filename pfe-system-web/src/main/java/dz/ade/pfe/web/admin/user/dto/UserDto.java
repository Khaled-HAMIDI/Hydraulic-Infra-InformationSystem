package dz.ade.pfe.web.admin.user.dto;

import dz.ade.pfe.web.admin.role.dto.RoleNoAuthDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String employeeCode;
    private String phoneNumber;
    private boolean enabled;
    private StructureDto structure;
    private List<RoleNoAuthDto> roles;
}
