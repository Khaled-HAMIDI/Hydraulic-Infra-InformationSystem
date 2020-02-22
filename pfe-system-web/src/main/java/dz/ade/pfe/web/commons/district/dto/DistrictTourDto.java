package dz.ade.pfe.web.commons.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistrictTourDto {
    private String id;
    private String code;
    private String designation;
    private List<StreetDistrictDto> streets;
}
