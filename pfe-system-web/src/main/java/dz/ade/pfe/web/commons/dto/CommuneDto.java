package dz.ade.pfe.web.commons.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommuneDto {

    private String id;
    private String code;
    private String designation;
}
