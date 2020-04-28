package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChlorationPostAddDto {

    private String typeComposant;

    private boolean abri;

    private String type;

    private double dimension;

    private String dosagePompe;

    private String pointInjectPompe;

    private String typePompe;

    private double debitPompe;

    private double hmtPompe;

    private double puissancePompe;

    private double nombrePompe;

    private boolean fonctionnementPompe;

    @Enumerated(EnumType.STRING)
    private EnumEtat statePompe;
}
