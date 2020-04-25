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

    @Column(name = "brand_ElectroGroupPump")
    private String brand;

    @Column(name = "hmt_ElectroGroupPump")
    private double hmt;

    @Column(name = "state_ElectroGroupPump")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "date_ElectroGroupPump")
    private LocalDate date;

    @Column(name = "npsh_ElectroGroupPump")
    private double npsh;

    @Column(name = "rotation_speed_ElectroGroupPump")
    private double rotationSpeed;

    @Column(name = "debit_ElectroGroupPump")
    private double debit;

    @Column(name = "functionning_number_ElectroGroupPump")
    private double functionningNumber;

    @Column(name = "secours_number_ElectroGroupPump")
    private double secoursNumber;

    @Column(name = "genre_ElectroGroupPump")
    private String genre;
}
