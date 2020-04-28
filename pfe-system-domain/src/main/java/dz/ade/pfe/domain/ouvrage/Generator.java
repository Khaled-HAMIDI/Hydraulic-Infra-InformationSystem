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
public class Generator extends Component {

    @Column(name = "storage_tank_generator")
    private double storageTank;

    @Column(name = "nature_generator")
    private String nature;

    @Column(name = "power_generator")
    private double power;

    @Column(name = "number_generator")
    private double number;


}

