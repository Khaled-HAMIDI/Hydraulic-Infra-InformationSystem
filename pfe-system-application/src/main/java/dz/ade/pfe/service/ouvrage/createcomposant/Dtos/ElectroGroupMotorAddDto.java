package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import dz.ade.pfe.domain.ouvrage.State;
import dz.ade.pfe.domain.ouvrage.GroupeStartMode;
import dz.ade.pfe.domain.ouvrage.ElectricGroupType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElectroGroupMotorAddDto {

    private String typeComposant;

    private String marque;

    private double puissance;

    @Enumerated(EnumType.STRING)
    private State state;

    @Enumerated(EnumType.STRING)
    private GroupeStartMode modeDemarrage;

    @Enumerated(EnumType.STRING)
    private ElectricGroupType type;

    private LocalDate operatingDate;

    private double nbService;

    private double nbSecours;

    private double tensionAlimentation;

    private double intensite;

    private double speed;
}
