package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.awt.*;

@Entity
@Table(name = "equipement_hedromeca", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipementHedromeca {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipement_hedromeca_gen")
    @SequenceGenerator(name = "equipement_hedromeca_gen", sequenceName = "equipement_hedromeca_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "dn")
    private double dn;

    @Column(name = "pn")
    private double pn;

    @Column(name = "materiaux")
    private String materiaux;

    @Column(name = "etat")
    private String etat;

    @Column(name = "observation")
    private String observation;
}
