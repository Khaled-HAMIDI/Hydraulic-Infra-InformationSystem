package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "kit_membrane", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KitMembrane {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "kit_gen")
    @SequenceGenerator(name = "kit_gen", sequenceName = "kit_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "caracteristique")
    private String caracteristique;
}
