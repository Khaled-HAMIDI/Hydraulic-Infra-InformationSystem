package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

import java.awt.*;

@Entity
@Table(name = "hedromeca_equipment", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class HedromecaEquipment extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipement_hedromeca_gen")
    @SequenceGenerator(name = "equipement_hedromeca_gen", sequenceName = "equipement_hedromeca_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "equipement_type")
    private String equipementType;

    @Column(name = "type")
    private String type;

    @Column(name = "number")
    private double number;

    @Column(name = "dn")
    private double dn;

    @Column(name = "pn")
    private double pn;

    @Column(name = "materials")
    private String materials;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "observation")
    private String observation;
}
