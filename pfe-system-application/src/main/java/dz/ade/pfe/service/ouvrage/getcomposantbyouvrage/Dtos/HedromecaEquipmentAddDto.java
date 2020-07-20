package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HedromecaEquipmentAddDto {

    private String typeComposant;

    private Double cost;

    private String equipementType;

    private String type;

    private double number;

    private double dn;

    private double pn;

    private String materiaux;

    private String state;

    private String lieuImplantation;
}
