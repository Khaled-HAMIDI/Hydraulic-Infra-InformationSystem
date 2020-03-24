package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "product_storage", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductStorage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stockage_produit_gen")
    @SequenceGenerator(name = "stockage_produit_gen", sequenceName = "stockage_produit_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "form")
    private String form;

        @Column(name = "dimention")
    private String dimention;

    @Column(name = "arrangement")
    private String arrangement;

    @Column(name = "state")
    private String state;
}
