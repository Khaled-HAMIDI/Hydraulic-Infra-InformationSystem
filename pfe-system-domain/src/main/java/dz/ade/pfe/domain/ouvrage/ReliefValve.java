package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import java.util.Date;

@Entity
@Table(name = "relief_valve", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReliefValve extends OuvrageComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "relief_valve_gen")
    @SequenceGenerator(name = "relief_valve_gen", sequenceName = "relief_valve_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "service_pressure")
    private double servicePressure;

    @Column(name = "etancheite_pressure")
    private double etancheitePressure;

    @Column(name = "tarage_pressure")
    private double taragePressure;

    @Column(name = "type")
    private String type;

}
