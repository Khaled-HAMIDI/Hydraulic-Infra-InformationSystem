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
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
        name="discriminator",
        discriminatorType=DiscriminatorType.STRING
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Component extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "component_gen")
    @SequenceGenerator(name = "component_gen", sequenceName = "component_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "type_composant")
    @Enumerated(EnumType.STRING)
    private ComponentType typeComposant;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ouvrage_id")
    private Ouvrage ouvrage;

}
