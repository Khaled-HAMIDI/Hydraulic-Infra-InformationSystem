package dz.ade.pfe.web.commons.street.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StreetListDto {

    private String id;
    private String code;
    private String designation;
    private String district;

}

