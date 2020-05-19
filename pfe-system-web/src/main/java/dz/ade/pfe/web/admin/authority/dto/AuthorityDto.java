package dz.ade.pfe.web.admin.authority.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityDto {
    private String id;
    private String description;
    private String domain;
}