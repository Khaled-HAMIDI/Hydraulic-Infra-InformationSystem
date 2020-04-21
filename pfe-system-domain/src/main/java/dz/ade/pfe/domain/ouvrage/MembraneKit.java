package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "membrane_kit", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MembraneKit extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "kit_gen")
    @SequenceGenerator(name = "kit_gen", sequenceName = "kit_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "characteristic")
    private String characteristic;

    @Column(name = "number")
    private Double number;
}
