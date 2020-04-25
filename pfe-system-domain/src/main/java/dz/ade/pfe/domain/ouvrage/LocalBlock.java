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
public class LocalBlock extends Component {

    @Column(name = "area_LocalBlock")
    private double area;

    @Column(name = "nature_LocalBlock")
    @Enumerated(EnumType.STRING)
    private EnumNatureBlocLocal nature;

    @Column(name = "state_LocalBlock")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;


}

