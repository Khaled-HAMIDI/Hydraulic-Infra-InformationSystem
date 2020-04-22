package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import dz.ade.pfe.domain.ouvrage.EnumNatureSecurity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SecurityAddDto {

    @NotBlank
    private String typeComposant;

    @NotBlank
    private boolean closing;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private EnumNatureSecurity nature;

    @NotBlank
    private double guerites;

    @NotBlank
    private double agents;

    @NotBlank
    private boolean armement;

    @NotBlank
    private boolean telsurveillance;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
