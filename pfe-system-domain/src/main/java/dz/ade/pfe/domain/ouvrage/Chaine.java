package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;


@Entity
@Table(name = "chaine", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chaine extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chaine_gen")
    @SequenceGenerator(name = "chaine_gen", sequenceName = "chaine_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    private double code;

    @Column(name = "nom")
    private String nom;

}

