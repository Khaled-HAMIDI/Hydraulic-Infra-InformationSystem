package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;


import dz.ade.pfe.domain.ouvrage.State;
import dz.ade.pfe.domain.ouvrage.InjectionType;
import dz.ade.pfe.domain.ouvrage.PumpMode;
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

    private Double cost;

    private String postType;

    private String type;

    private double dimension;

    private String form;

    private double number;

    private String lieuImplantation;

    private String pointInjectPompe;

    @Enumerated(EnumType.STRING)
    private InjectionType dosagePompe;

    private String typePompe;

    private double debitPompe;

    private double hmtPompe;

    private double puissancePompe;

    private double nombrePompe;

    private boolean fonctionnementPompe;

    @Enumerated(EnumType.STRING)
    private PumpMode modePompe;

    @Enumerated(EnumType.STRING)
    private State statePompe;
}
