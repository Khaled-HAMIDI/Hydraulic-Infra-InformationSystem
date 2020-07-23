package dz.ade.pfe.service.ouvrage.printouvragerecap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OuvrageRecapDto {
    String wilaya ;
    String ouvrage;
    String type;
    Double capacity_min;
    Double capacity_max;
    Integer dater;
    Integer dates;
    String role;
    String state;
    String enabled;
    String cost_min;
    String cost_max;
}
