package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "ouvrage_chain", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OuvrageChain {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ouvrage_chaine_gen")
    @SequenceGenerator(name = "ouvrage_chaine_gen", sequenceName = "ouvrage_chaine_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "id_ouvrage")
    private Long id_ouvrage;

    @Column(name = "id_chaine")
    private Long id_chaine;

    @Column(name = "position")
    private double position;

}

