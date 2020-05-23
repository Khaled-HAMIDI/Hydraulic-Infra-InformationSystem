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

    @Column(name = "area_local_block")
    private double area;

    @Column(name = "nature_local_block")
    @Enumerated(EnumType.STRING)
    private LocalBlocNature nature;

    @Column(name = "state_local_block")
    @Enumerated(EnumType.STRING)
    private State state;


}

