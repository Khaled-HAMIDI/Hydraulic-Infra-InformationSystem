package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "stockage_produit", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockageProduit {
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

    @Column(name = "etat")
    private String etat;
}
