package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElectricBuildingAddDto {

    private String typeComposant;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    private String nature;

    private double area;
}
