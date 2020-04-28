package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TransformationStation extends Component {

    @Column(name = "brand_transformation_station")
    private String brand;

    @Column(name = "power_transformation_station")
    private double power;

    @Column(name = "up_us_transformation_station")
    private double up_us;

    @Column(name = "ip_is_transformation_station")
    private double ip_is;

    @Column(name = "ucc_transformation_station")
    private double ucc;

    @Column(name = "coupling_transformation_station")
    private String coupling;

    @Column(name = "oil_nature_transformation_station")
    private String oilNature;

    @Column(name = "abri_nature_transformation_station")
    private String abriNature;

    @Column(name = "pmt_transformation_station")
    private double pmt;

    @Column(name = "pbt_transformation_station")
    private double pbt;

    @Column(name = "pmd_transformation_station")
    private double pmd;

    @Column(name = "tarif_transformation_station")
    private double tarif;

    @Column(name = "pma_transformation_station")
    private double pma;

    @Column(name = "tcomptage_transformation_station")
    private String tcomptage;
}
