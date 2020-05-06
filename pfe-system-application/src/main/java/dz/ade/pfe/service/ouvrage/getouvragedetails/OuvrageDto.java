package dz.ade.pfe.service.ouvrage.getouvragedetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageDto {

    private String id;

    private String code;

    private String type;

    private Boolean enabled;

    private String state;

    private Double installedCapacity;

    private Double currentCapacity;

}
