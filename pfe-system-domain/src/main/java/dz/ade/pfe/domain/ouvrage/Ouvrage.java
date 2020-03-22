package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import dz.ade.pfe.domain.commons.Auditing;


@Entity
@Table(name = "ouvrage", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ouvrage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ouvrage_gen")
    @SequenceGenerator(name = "ouvrage_gen", sequenceName = "ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "nom")
    private String nom;

    @Column(name = "type")
    private String type;

    @Column(name = "fonctionnement")
    private boolean fonctionnement;

    @Column(name = "etat")
    private String etat;

    @Column(name = "localite")
    private String localite;

    @Column(name = "commune")
    private Long commune ;

    @Column(name = "cordonnee")
    private double cordonnee;

    @Column(name = "superficie")
    private double superficie;

    @Column(name = "capacite_installee")
    private double capacite_installee;

    @Column(name = "capacite_actuelle")
    private double capacite_actuelle;

    @Column(name = "nature_construction")
    private String nature_construction;

    @Column(name = "date_mise_service")
    private LocalDate date_mise_service;

    @Column(name = "date_exploitation")
    private LocalDate date_exploitation;

    @Column(name = "maitre_ouvrage")
    private String maitre_ouvrage;

    @Column(name = "cout_realisation")
    private double cout_realisation;

    @Column(name = "ligne_specialisee")
    private boolean ligne_specialisee;

    @Column(name = "facture_m_energie")
    private double facture_m_energie;

    @Column(name = "effectif_total")
    private int effectif_total;

}

