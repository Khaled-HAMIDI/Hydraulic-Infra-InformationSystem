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

    @Column(name = "characteristic_MembraneKit")
    private String characteristic;

    @Column(name = "number_MembraneKit")
    private Double number;
}
