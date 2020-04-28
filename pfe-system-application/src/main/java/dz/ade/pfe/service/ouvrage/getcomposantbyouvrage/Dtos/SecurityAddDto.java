package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import dz.ade.pfe.domain.ouvrage.EnumNatureSecurity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SecurityAddDto {

    private String typeComposant;

    private boolean closing;

    @Enumerated(EnumType.STRING)
    private EnumNatureSecurity nature;

    private double guerites;

    private double agents;

    private boolean armement;

    private boolean telsurveillance;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
