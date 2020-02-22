package dz.ade.pfe.web.commons.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DistrictListDto {

    private String id;
    private String code;
    private String designation;
    private String agency;

}
