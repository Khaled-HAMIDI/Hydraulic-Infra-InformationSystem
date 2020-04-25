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

    @Column(name = "type_WaterIntake")
    @Enumerated(EnumType.STRING)
    private EnumTypePriseEau type;

    @Column(name = "dimension_WaterIntake")
    private String dimension;

    @Column(name = "nature_WaterIntake")
    private String nature;
}