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
public class ElectricalCabinetAddDto {

    private String typeComposant;

    private double puissance;

    private double number;

    private String observation;

    @Enumerated(EnumType.STRING)
    private State state;

    private String marque;
}
