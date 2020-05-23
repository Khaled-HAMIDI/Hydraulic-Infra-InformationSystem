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
public class WaterIntake extends Component {

    @Column(name = "type_water_intake")
    @Enumerated(EnumType.STRING)
    private WaterIntakeType type;

    @Column(name = "dimension_water_intake")
    private String dimension;

    @Column(name = "nature_water_intake")
    private String nature;
}