package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhpStationAddDto {

    private String typeComposant;

    private double debit;

    private double hmt;

    private double puissance;

    private double nombre;
}
