package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import dz.ade.pfe.domain.ouvrage.EnumNatureBlocLocal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocalBlockAddDto {

    private String typeComposant;

    private double area;

    @Enumerated(EnumType.STRING)
    private EnumNatureBlocLocal nature;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
