package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ElectroGroupPumpAddDto {

    private String typeComposant;

    private String marque;

    private double hmt;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    private LocalDate operatingDate;

    private double npsh;

    private double rotationSpeed;

    private double debit;

    private double nbService;

    private double nbSecours;

    private String genre;
}
