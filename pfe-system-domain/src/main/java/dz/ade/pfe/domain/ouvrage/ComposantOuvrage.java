package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "composant_ouvrage", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComposantOuvrage extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "composant_ouvrage_gen")
    @SequenceGenerator(name = "composant_ouvrage_gen", sequenceName = "composant_ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "capacite")
    private double capacite;

    @Column(name = "type")
    private String type;

    @Column(name = "forme")
    private String forme;

    @Column(name = "nature")
    private String nature;

    @Column(name = "etat")
    private String etat;

    @Column(name = "fonctionnement")
    private boolean fonctionnement;
}
