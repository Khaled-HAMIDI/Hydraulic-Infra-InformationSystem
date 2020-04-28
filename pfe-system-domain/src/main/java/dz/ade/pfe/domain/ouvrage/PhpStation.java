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

    @Column(name = "debit_php_station")
    private double debit;

    @Column(name = "hmt_php_station")
    private double hmt;

    @Column(name = "power_php_station")
    private double power;

    @Column(name = "number_php_station")
    private double number;


}
