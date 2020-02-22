package dz.ade.pfe.web.admin.role.dto;

import io.advantageous.boon.core.Str;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityDto {
    private String id;
    private String description;
}