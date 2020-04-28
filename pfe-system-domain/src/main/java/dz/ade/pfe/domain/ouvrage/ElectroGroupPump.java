package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ElectroGroupPump  extends Component {

    @Column(name = "brand_electro_group_pump")
    private String brand;

    @Column(name = "hmt_electro_group_pump")
    private double hmt;

    @Column(name = "state_electro_group_pump")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "date_electro_group_pump")
    private LocalDate date;

    @Column(name = "npsh_electro_group_pump")
    private double npsh;

    @Column(name = "rotation_speed_electro_group_pump")
    private double rotationSpeed;

    @Column(name = "debit_electro_group_pump")
    private double debit;

    @Column(name = "functionning_number_electro_group_pump")
    private double functionningNumber;

    @Column(name = "secours_number_electro_group_pump")
    private double secoursNumber;

    @Column(name = "genre_electro_group_pump")
    private String genre;
}
