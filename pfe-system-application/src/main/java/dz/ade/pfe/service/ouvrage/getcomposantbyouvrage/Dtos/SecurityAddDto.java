package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

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

    private Double cost;

    private boolean closing;

    private String nature;

    private double guerites;

    private double agents;

    private boolean armement;

    private boolean telsurveillance;

    private String state;
}
