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
public class HedromecaEquipmentAddDto {

    private String typeComposant;

    private String equipementType;

    private String type;

    private double number;

    private double dn;

    private double pn;

    private String materiaux;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    private String lieuImplantation;
}
