package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "membrane_kit", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembraneKit {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "kit_gen")
    @SequenceGenerator(name = "kit_gen", sequenceName = "kit_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "characteristic")
    private String characteristic;
}
