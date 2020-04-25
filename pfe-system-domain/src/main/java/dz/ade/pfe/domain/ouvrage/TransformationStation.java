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

    @Column(name = "brand_TransformationStation")
    private String brand;

    @Column(name = "power_TransformationStation")
    private double power;

    @Column(name = "up_us_TransformationStation")
    private double up_us;

    @Column(name = "ip_is_TransformationStation")
    private double ip_is;

    @Column(name = "ucc_TransformationStation")
    private double ucc;

    @Column(name = "coupling_TransformationStation")
    private String coupling;

    @Column(name = "oil_nature_TransformationStation")
    private String oilNature;

    @Column(name = "abri_nature_TransformationStation")
    private String abriNature;

    @Column(name = "pmt_TransformationStation")
    private double pmt;

    @Column(name = "pbt_TransformationStation")
    private double pbt;

    @Column(name = "pmd_TransformationStation")
    private double pmd;

    @Column(name = "tarif_TransformationStation")
    private double tarif;

    @Column(name = "pma_TransformationStation")
    private double pma;

    @Column(name = "tcomptage_TransformationStation")
    private String tcomptage;
}
