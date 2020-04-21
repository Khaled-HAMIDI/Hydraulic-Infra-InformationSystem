package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import dz.ade.pfe.domain.commons.Auditing;
import java.util.Date;

@Entity
@Table(name = "electro_group_motor", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElectroGroupMotor extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electro_moteur_gen")
    @SequenceGenerator(name = "groupe_electro_moteur_gen", sequenceName = "groupe_electro_moteur_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "power")
    private double power;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "mode")
    @Enumerated(EnumType.STRING)
    private EnumModeDemarageGrp mode;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private EnumTypeGrpElectro type;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "functionning_number")
    private double functionningNumber;

    @Column(name = "secours_number")
    private double secoursNumber;

    @Column(name = "alimentation_tension")
    private double alimentationTension;

    @Column(name = "nominale_intensite")
    private double nominaleIntensite;

    @Column(name = "speed")
    private double speed;




}
