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

    @Column(name = "brand_ReliefValve")
    private String brand;

    @Column(name = "service_pressure_ReliefValve")
    private double servicePressure;

    @Column(name = "etancheite_pressure_ReliefValve")
    private double etancheitePressure;

    @Column(name = "tarage_pressure_ReliefValve")
    private double taragePressure;

    @Column(name = "type_ReliefValve")
    private String type;

}
