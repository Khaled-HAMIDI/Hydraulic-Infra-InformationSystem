package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import dz.ade.pfe.domain.ouvrage.State;
import dz.ade.pfe.domain.ouvrage.SecurityNature;
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
    private SecurityNature nature;

    private double guerites;

    private double agents;

    private boolean armement;

    private boolean telsurveillance;

    @Enumerated(EnumType.STRING)
    private State state;
}
