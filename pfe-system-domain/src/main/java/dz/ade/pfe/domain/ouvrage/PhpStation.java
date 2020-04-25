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
public class PhpStation extends Component {

    @Column(name = "debit_PhpStation")
    private double debit;

    @Column(name = "hmt_PhpStation")
    private double hmt;

    @Column(name = "power_PhpStation")
    private double power;

    @Column(name = "number_PhpStation")
    private double number;


}
