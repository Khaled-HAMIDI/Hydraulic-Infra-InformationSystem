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

    @Column(name = "power_electrical_cabinet")
    private double power;

    @Column(name = "number_electrical_cabinet")
    private double number;

    @Column(name = "observation_electrical_cabinet")
    private String observation;

    @Column(name = "state_electrical_cabinet")
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "brand_electrical_cabinet")
    private String brand;


}

