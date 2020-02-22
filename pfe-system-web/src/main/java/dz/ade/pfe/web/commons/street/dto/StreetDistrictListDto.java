package dz.ade.pfe.web.commons.street.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StreetDistrictListDto {
    private String id;
    private String code;
    private String designation;
}
