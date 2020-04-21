package dz.ade.pfe.domain.ouvrage;

import lombok.*;


import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;


@Entity
@Table(name = "electrical_cabinet", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElectricalCabinet extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "electrical_cabinet_gen")
    @SequenceGenerator(name = "electrical_cabinet_gen", sequenceName = "electrical_cabinet_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "power")
    private double power;

    @Column(name = "number")
    private double number;

    @Column(name = "observation")
    private String observation;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "brand")
    private String brand;


}

