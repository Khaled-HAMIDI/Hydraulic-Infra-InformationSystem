package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "traitement_station_equipement", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TraitementStationEquipement extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "traitement_station_equipement_gen")
    @SequenceGenerator(name = "traitement_station_equipement_gen", sequenceName = "traitement_station_equipement_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "capacity")
    private double capacity;

    @Column(name = "type_equipement")
    private String typeEquipement;

    @Column(name = "type")
    private String type;

    @Column(name = "number")
    private double number;

    @Column(name = "form")
    private String form;

    @Column(name = "nature")
    private String nature;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "enabled")
    private boolean enabled;
}
