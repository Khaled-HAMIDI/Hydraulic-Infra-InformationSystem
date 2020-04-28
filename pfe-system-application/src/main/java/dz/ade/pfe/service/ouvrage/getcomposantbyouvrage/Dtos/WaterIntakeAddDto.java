package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumTypePriseEau;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WaterIntakeAddDto {

    private String typeComposant;

    @Enumerated(EnumType.STRING)
    private EnumTypePriseEau type;

    private String dimension;

    private String nature;
}
