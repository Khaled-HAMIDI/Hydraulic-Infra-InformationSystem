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
public class ReliefValveAddDto {

    private String typeComposant;

    private Double cost;

    private String marque;

    private double presseionService;

    private double presseionEtanchiete;

    private double presseionTarage;

    private String type;
}
