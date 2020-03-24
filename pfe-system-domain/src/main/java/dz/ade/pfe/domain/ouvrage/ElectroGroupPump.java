package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "electro_group_pump", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectroGroupPump  {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electro_pompe_gen")
    @SequenceGenerator(name = "groupe_electro_pompe_gen", sequenceName = "groupe_electro_pompe_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "gepi")
    private double gepi;

    @Column(name = "brand")
    private String brand;

    @Column(name = "power")
    private double power;

    @Column(name = "hmt")
    private double hmt;

    @Column(name = "debit")
    private double debit;

    @Column(name = "state")
    private String state;

    @Column(name = "date")
    private LocalDate date;
}
