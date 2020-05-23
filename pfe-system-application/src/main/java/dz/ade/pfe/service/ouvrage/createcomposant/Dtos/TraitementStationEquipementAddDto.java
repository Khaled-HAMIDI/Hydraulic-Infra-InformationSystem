package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import dz.ade.pfe.domain.ouvrage.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TraitementStationEquipementAddDto {

    private String typeComposant;

    private double capacity;

    private String typeEquipement;

    private String type;

    private double number;

    private String form;

    private String nature;

    @Enumerated(EnumType.STRING)
    private State state;

    private boolean enabled;


}
