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
public class ElectricalCabinet extends Component {

    @Column(name = "power_ElectricalCabinet")
    private double power;

    @Column(name = "number_ElectricalCabinet")
    private double number;

    @Column(name = "observation_ElectricalCabinet")
    private String observation;

    @Column(name = "state_ElectricalCabinet")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "brand_ElectricalCabinet")
    private String brand;


}

