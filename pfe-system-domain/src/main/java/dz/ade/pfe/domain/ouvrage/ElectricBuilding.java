package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "electric_building", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ElectricBuilding extends Component {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "batiment_electrique_gen")
    @SequenceGenerator(name = "batiment_electrique_gen", sequenceName = "batiment_electrique_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "nature")
    private String nature;

    @Column(name = "area")
    private double area;


}
