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
public class ReliefValve extends Component {

    @Column(name = "brand_relief_valve")
    private String brand;

    @Column(name = "service_pressure_relief_valve")
    private double servicePressure;

    @Column(name = "etancheite_pressure_relief_valve")
    private double etancheitePressure;

    @Column(name = "tarage_pressure_relief_valve")
    private double taragePressure;

    @Column(name = "type_relief_valve")
    private String type;

}
