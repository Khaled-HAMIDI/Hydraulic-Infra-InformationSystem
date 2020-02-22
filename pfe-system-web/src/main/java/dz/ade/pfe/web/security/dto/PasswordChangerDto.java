package dz.ade.pfe.web.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangerDto {
    private String currentPassword;
    private String newPassword;
}
