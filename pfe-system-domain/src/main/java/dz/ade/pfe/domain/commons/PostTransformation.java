package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "post_transformation", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostTransformation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_transformation_gen")
    @SequenceGenerator(name = "post_transformation_gen", sequenceName = "post_transformation_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "marque")
    private String marque;

    @Column(name = "puissance")
    private double puissance;

    @Column(name = "emplacement")
    private String emplacement;

    @Column(name = "up_us")
    private double up_us;

    @Column(name = "ip_is")
    private double ip_is;

    @Column(name = "ucc")
    private double ucc;

    @Column(name = "couplage")
    private String couplage;

    @Column(name = "nhuile")
    private String nhuile;

    @Column(name = "nabri")
    private String nabri;

    @Column(name = "pmt")
    private double pmt;

    @Column(name = "pbt")
    private double pbt;

    @Column(name = "pmd")
    private double pmd;

    @Column(name = "tarif")
    private double tarif;

    @Column(name = "pma")
    private double pma;

    @Column(name = "tcomptage")
    private String tcomptage;
}
