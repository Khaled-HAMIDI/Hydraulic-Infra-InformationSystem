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

    @Column(name = "storage_tank_Generator")
    private double storageTank;

    @Column(name = "nature_Generator")
    private String nature;

    @Column(name = "power_Generator")
    private double power;

    @Column(name = "number_Generator")
    private double number;


}

