package dz.ade.pfe.service.ouvrage.getouvragelist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class OuvrageListDto {
    private String id;

    private String code;

    private String name;

    private String type;

    private LocalDate operatingDate;

    private LocalDate commissioningDate;

    private String state;

    private Double installedCapacity;

    private Double currentCapacity;

    private Integer nbApears;
}
