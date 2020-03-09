package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "equipement_electrique", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipementElectrique {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipement_electrique_gen")
    @SequenceGenerator(name = "equipement_electrique_gen", sequenceName = "equipement_electrique_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "puissance")
    private double puissance;

    @Column(name = "nature")
    private String nature;


}

