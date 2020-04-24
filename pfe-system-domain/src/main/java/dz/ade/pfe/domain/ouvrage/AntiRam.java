package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "anti_ram", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AntiRam extends Component {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "anti_belier_gen")
    @SequenceGenerator(name = "anti_belier_gen", sequenceName = "anti_belier_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "capacity")
    private double capacity;

    @Column(name = "service_pressure")
    private double servicePressure;

    @Column(name = "test_pressure")
    private double testPressure;

    @Column(name = "inflation_pressure")
    private double inflationPressure;

    @Column(name = "type")
    private String type;

    @Column(name = "compressor")
    private boolean compressor;
}
