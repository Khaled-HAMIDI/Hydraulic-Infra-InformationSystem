package dz.ade.pfe.domain.ouvrage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "component", schema = "pfe")
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(name="type_composant")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Component extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "composant_ouvrage_gen")
    @SequenceGenerator(name = "composant_ouvrage_gen", sequenceName = "composant_ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "type_composant")
    private String typeComposant;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ouvrage_id")
    @JsonIgnore
    private Ouvrage ouvrage;

}
