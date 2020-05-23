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

    @Column(name = "brand_electro_group_motor")
    private String brand;

    @Column(name = "power_electro_group_motor")
    private double power;

    @Column(name = "state_electro_group_motor")
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "mode_electro_group_motor")
    @Enumerated(EnumType.STRING)
    private GroupeStartMode mode;

    @Column(name = "type_electro_group_motor")
    @Enumerated(EnumType.STRING)
    private ElectricGroupType type;

    @Column(name = "date_electro_group_motor")
    private LocalDate date;

    @Column(name = "functionning_number_electro_group_motor")
    private double functionningNumber;

    @Column(name = "secours_number_electro_group_motor")
    private double secoursNumber;

    @Column(name = "alimentation_tension_electro_group_motor")
    private double alimentationTension;

    @Column(name = "nominale_intensite_electro_group_motor")
    private double nominaleIntensite;

    @Column(name = "speed_electro_group_motor")
    private double speed;




}
