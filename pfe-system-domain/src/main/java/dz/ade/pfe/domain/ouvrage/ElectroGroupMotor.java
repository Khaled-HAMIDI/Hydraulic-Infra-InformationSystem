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
public class ElectroGroupMotor extends Component {

    @Column(name = "brand_ElectroGroupMotor")
    private String brand;

    @Column(name = "power_ElectroGroupMotor")
    private double power;

    @Column(name = "state_ElectroGroupMotor")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "mode_ElectroGroupMotor")
    @Enumerated(EnumType.STRING)
    private EnumModeDemarageGrp mode;

    @Column(name = "type_ElectroGroupMotor")
    @Enumerated(EnumType.STRING)
    private EnumTypeGrpElectro type;

    @Column(name = "date_ElectroGroupMotor")
    private LocalDate date;

    @Column(name = "functionning_number_ElectroGroupMotor")
    private double functionningNumber;

    @Column(name = "secours_number_ElectroGroupMotor")
    private double secoursNumber;

    @Column(name = "alimentation_tension_ElectroGroupMotor")
    private double alimentationTension;

    @Column(name = "nominale_intensite_ElectroGroupMotor")
    private double nominaleIntensite;

    @Column(name = "speed_ElectroGroupMotor")
    private double speed;




}
