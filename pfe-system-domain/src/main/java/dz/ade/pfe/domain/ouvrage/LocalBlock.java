package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;


@Entity
@Table(name = "local_block", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocalBlock extends OuvrageComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bloc_local_gen")
    @SequenceGenerator(name = "bloc_local_gen", sequenceName = "bloc_local_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "area")
    private double area;

    @Column(name = "nature")
    @Enumerated(EnumType.STRING)
    private EnumNatureBlocLocal nature;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;


}

