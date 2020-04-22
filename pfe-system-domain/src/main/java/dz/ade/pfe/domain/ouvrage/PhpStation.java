package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "php_station", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PhpStation extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "station_php_gen")
    @SequenceGenerator(name = "station_php_gen", sequenceName = "station_php_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "debit")
    private double debit;

    @Column(name = "hmt")
    private double hmt;

    @Column(name = "power")
    private double power;

    @Column(name = "number")
    private double number;


}
