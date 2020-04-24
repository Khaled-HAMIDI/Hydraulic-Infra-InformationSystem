package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "water_intake", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class WaterIntake extends Component {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prise_eau_gen")
    @SequenceGenerator(name = "prise_eau_gen", sequenceName = "prise_eau_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private EnumTypePriseEau type;

    @Column(name = "dimension")
    private String dimension;

    @Column(name = "nature")
    private String nature;
}