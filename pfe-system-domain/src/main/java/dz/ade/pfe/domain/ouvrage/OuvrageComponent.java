package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "ouvrage_component", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OuvrageComponent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "composant_ouvrage_gen")
    @SequenceGenerator(name = "composant_ouvrage_gen", sequenceName = "composant_ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "capacity")
    private double capacity;

    @Column(name = "type")
    private String type;

    @Column(name = "form")
    private String form;

    @Column(name = "nature")
    private String nature;

    @Column(name = "state")
    private String state;

    @Column(name = "enabled")
    private boolean enabled;
}
