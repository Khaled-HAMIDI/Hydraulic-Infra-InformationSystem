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

    @Column(name = "brand_anti_ram")
    private String brand;

    @Column(name = "capacity_anti_ram")
    private double capacity;

    @Column(name = "service_pressure_anti_ram")
    private double servicePressure;

    @Column(name = "test_pressure_anti_ram")
    private double testPressure;

    @Column(name = "inflation_pressure_anti_ram")
    private double inflationPressure;

    @Column(name = "type_anti_ram")
    private String type;

    @Column(name = "compressor_anti_ram")
    private boolean compressor;
}
