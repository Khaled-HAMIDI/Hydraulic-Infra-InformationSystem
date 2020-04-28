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
public class ElectricBuilding extends Component {

    @Column(name = "state_electric_building")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "nature_electric_building")
    private String nature;

    @Column(name = "area_electric_building")
    private double area;


}
