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
public class AntiRamAddDto {

    private String typeComposant;

    private String marque;

    private double capacity;

    private double presseionService;

    private double presseionEpreuve;

    private double presseionRegonflage;

    private String type;

    private boolean compresseur;
}
