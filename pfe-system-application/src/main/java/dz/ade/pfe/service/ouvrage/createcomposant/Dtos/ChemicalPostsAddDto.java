package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;


import dz.ade.pfe.domain.ouvrage.EnumEtat;
import dz.ade.pfe.domain.ouvrage.EnumInjectionType;
import dz.ade.pfe.domain.ouvrage.EnumModePompe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChemicalPostsAddDto {

    private String typeComposant;

    private String postType;

    private String type;

    private double dimension;

    private String form;

    private double number;

    private String lieuImplantation;

    private String pointInjectPompe;

    @Enumerated(EnumType.STRING)
    private EnumInjectionType dosagePompe;

    private String typePompe;

    private double debitPompe;

    private double hmtPompe;

    private double puissancePompe;

    private double nombrePompe;

    private boolean fonctionnementPompe;

    @Enumerated(EnumType.STRING)
    private EnumModePompe modePompe;

    @Enumerated(EnumType.STRING)
    private EnumEtat statePompe;
}
