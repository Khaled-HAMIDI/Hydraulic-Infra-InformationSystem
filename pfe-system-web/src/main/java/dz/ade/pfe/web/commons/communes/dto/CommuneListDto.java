package dz.ade.pfe.web.commons.communes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommuneListDto {

    private String id;
    private String code;
    private String designation;
}
