package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "groupe_electro_pompe", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupeElectroPompe {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electro_pompe_gen")
    @SequenceGenerator(name = "groupe_electro_pompe_gen", sequenceName = "groupe_electro_pompe_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "gepi")
    private double gepi;

    @Column(name = "marque")
    private String marque;

    @Column(name = "puissance")
    private double puissance;

    @Column(name = "hmt")
    private double hmt;

    @Column(name = "debit")
    private double debit;

    @Column(name = "etat")
    private String etat;

    @Column(name = "date")
    private LocalDate date;
}
