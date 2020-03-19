package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageDto {
    private String id;

    private double code;

    private String nom;

    private String type;

    private String fonctionnement;

    private String etat;

    private String localite;

    private Long commune ;

    private double cordonnee;

    private double superficie;

    private double capacite_installee;

    private double capacite_actuelle;

    private String nature_construction;

    private LocalDate date_mise_service;

    private LocalDate date_exploitation;

    private String maitre_ouvrage;

    private double cout_realisation;

    private double ligne_specialisee;

    private double facture_m_energie;

    private double effectif_total;
}
