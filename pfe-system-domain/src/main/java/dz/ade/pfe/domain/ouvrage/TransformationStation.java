package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "transformation_station", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransformationStation extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_transformation_gen")
    @SequenceGenerator(name = "post_transformation_gen", sequenceName = "post_transformation_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "power")
    private double power;

    @Column(name = "up_us")
    private double up_us;

    @Column(name = "ip_is")
    private double ip_is;

    @Column(name = "ucc")
    private double ucc;

    @Column(name = "coupling")
    private String coupling;

    @Column(name = "oil_nature")
    private String oilNature;

    @Column(name = "abri_nature")
    private String abriNature;

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
