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

    @Column(name = "state_ElectricBuilding")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "nature_ElectricBuilding")
    private String nature;

    @Column(name = "area_ElectricBuilding")
    private double area;


}
