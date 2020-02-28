package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "groupe_electro_moteur", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupeElectroMoteur {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electro_moteur_gen")
    @SequenceGenerator(name = "groupe_electro_moteur_gen", sequenceName = "groupe_electro_moteur_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "marque")
    private String marque;

    @Column(name = "puissance")
    private double puissance;

    @Column(name = "etat")
    private String etat;

    @Column(name = "mode")
    private String mode;

    @Column(name = "type")
    private String type;

    @Column(name = "date")
    private LocalDate date;
}
