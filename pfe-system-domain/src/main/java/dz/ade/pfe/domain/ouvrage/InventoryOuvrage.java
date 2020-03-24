package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;


@Entity
@Table(name = "inventory_ouvrage", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryOuvrage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventaire_ouvrage_gen")
    @SequenceGenerator(name = "inventaire_ouvrage_gen", sequenceName = "inventaire_ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "id_inventaire")
    private Long id_inventaire;

    @Column(name = "id_ouvrage")
    private Long id_ouvrage;


}

