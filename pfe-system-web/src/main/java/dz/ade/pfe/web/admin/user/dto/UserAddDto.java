package dz.ade.pfe.web.admin.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAddDto {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String employeeCode;
    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String phoneNumber;
    @NotNull
    private boolean enabled;
    private String structure;
    @NotEmpty
    private List<@NotBlank String> roles;
}
