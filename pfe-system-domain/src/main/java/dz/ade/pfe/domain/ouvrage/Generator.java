package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "generator", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Generator extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupe_electrogene_gen")
    @SequenceGenerator(name = "groupe_electrogene_gen", sequenceName = "groupe_electrogene_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "storage_tank")
    private double storageTank;

    @Column(name = "nature")
    private String nature;

    @Column(name = "power")
    private double power;

    @Column(name = "number")
    private double number;


}

