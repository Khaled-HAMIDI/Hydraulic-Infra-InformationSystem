package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "ouvrage_component", schema = "pfe")
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(name="type_composant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class OuvrageComponent extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "composant_ouvrage_gen")
    @SequenceGenerator(name = "composant_ouvrage_gen", sequenceName = "composant_ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "type_composant")
    private String typeComposant;


}
