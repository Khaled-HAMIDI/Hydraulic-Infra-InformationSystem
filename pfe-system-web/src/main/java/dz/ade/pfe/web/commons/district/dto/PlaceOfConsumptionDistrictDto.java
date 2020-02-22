package dz.ade.pfe.web.commons.district.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOfConsumptionDistrictDto {
    private String id;
    private String code;
    private String address;
    private String designation;
    private Float latitude;
    private Float longitude;
    private Integer positionInTour;
}
