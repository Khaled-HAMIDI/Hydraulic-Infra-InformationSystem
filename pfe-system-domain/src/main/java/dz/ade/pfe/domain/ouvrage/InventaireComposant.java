package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "inventaire_composant", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventaireComposant extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventaire_composant_gen")
    @SequenceGenerator(name = "inventaire_composant_gen", sequenceName = "inventaire_composant_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "id_composant")
    private Long id_composant;

    @Column(name = "id_inventaire")
    private Long id_inventaire;

    @Column(name = "etat")
    private String etat;

    @Column(name = "ecart")
    private String ecart;


}
