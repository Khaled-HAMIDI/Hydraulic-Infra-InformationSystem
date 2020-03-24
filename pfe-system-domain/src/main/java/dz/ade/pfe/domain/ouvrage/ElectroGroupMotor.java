package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "electro_group_motor", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectroGroupMotor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electro_moteur_gen")
    @SequenceGenerator(name = "groupe_electro_moteur_gen", sequenceName = "groupe_electro_moteur_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "power")
    private double power;

    @Column(name = "state")
    private String state;

    @Column(name = "mode")
    private String mode;

    @Column(name = "type")
    private String type;

    @Column(name = "date")
    private LocalDate date;
}
