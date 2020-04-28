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
public class MembraneKit extends Component {

    @Column(name = "characteristic_membrane_kit")
    private String characteristic;

    @Column(name = "number_membrane_kit")
    private Double number;
}
