package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import dz.ade.pfe.domain.commons.Auditing;
import java.util.Date;

@Entity
@Table(name = "electro_group_pump", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElectroGroupPump  extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electro_pompe_gen")
    @SequenceGenerator(name = "groupe_electro_pompe_gen", sequenceName = "groupe_electro_pompe_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "hmt")
    private double hmt;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "npsh")
    private double npsh;

    @Column(name = "rotation_speed")
    private double rotationSpeed;

    @Column(name = "debit")
    private double debit;

    @Column(name = "functionning_number")
    private double functionningNumber;

    @Column(name = "secours_number")
    private double secoursNumber;

    @Column(name = "genre")
    private String genre;
}
