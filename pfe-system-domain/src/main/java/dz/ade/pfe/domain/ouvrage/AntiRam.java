package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class AntiRam extends Component {

    @Column(name = "brand_AntiRam")
    private String brand;

    @Column(name = "capacity_AntiRam")
    private double capacity;

    @Column(name = "service_pressure_AntiRam")
    private double servicePressure;

    @Column(name = "test_pressure_AntiRam")
    private double testPressure;

    @Column(name = "inflation_pressure_AntiRam")
    private double inflationPressure;

    @Column(name = "type_AntiRam")
    private String type;

    @Column(name = "compressor_AntiRam")
    private boolean compressor;
}
