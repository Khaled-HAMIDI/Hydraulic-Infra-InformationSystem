package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "generator", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Generator extends Auditing{
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


}

