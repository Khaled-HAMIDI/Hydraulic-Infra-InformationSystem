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
public class ChlorationPost extends Component {

    @Column(name = "abri_chloration_post")
    private boolean abri;

    @Column(name = "type_chloration_post")
    private String type;

    @Column(name = "dimension_chloration_post")
    private double dimension;


    @Column(name = "dosage_chloration_post")
    private String dosage;

    @Column(name = "injection_point_chloration_post")
    private String injectionPoint;


    @Column(name = "pump_type_chloration_post")
    private String pumpType;

    @Column(name = "debit_chloration_post")
    private double debit;

    @Column(name = "hmt_chloration_post")
    private double hmt;

    @Column(name = "power_chloration_post")
    private double power;

    @Column(name = "pump_number_chloration_post")
    private double pumpNumber;

    @Column(name = "enabled_chloration_post")
    private boolean enabled;

    @Column(name = "state_chloration_post")
    @Enumerated(EnumType.STRING)
    private State state;
}
