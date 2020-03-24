package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "electric_building", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectricBuilding {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "batiment_electrique_gen")
    @SequenceGenerator(name = "batiment_electrique_gen", sequenceName = "batiment_electrique_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "state")
    private String state;

    @Column(name = "nature")
    private String nature;

    @Column(name = "area")
    private double area;


}
