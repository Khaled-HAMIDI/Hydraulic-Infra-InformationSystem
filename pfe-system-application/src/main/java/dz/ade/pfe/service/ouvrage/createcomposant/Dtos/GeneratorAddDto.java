package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;


import dz.ade.pfe.domain.ouvrage.ComponentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratorAddDto {

    private String typeComposant;

    private Double cost;

    private double cuve;

    private String nature;

    private double puissance;

    private double number;
}
