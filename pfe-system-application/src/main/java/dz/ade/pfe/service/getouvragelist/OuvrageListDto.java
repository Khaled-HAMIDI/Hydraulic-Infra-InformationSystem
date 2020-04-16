package dz.ade.pfe.service.getouvragelist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class OuvrageListDto {
    private String id;

    private String code;

    private String name;

    private String type;

    private Boolean enabled;

    private String state;

    private Double installedCapacity;

    private Double currentCapacity;
}
