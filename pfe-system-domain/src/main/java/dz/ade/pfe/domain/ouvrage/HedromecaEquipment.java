package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.awt.*;

@Entity
@Table(name = "hedromeca_equipment", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HedromecaEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipement_hedromeca_gen")
    @SequenceGenerator(name = "equipement_hedromeca_gen", sequenceName = "equipement_hedromeca_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "dn")
    private double dn;

    @Column(name = "pn")
    private double pn;

    @Column(name = "materials")
    private String materials;

    @Column(name = "state")
    private String state;

    @Column(name = "observation")
    private String observation;
}
