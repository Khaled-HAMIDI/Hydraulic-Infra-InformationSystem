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

    @Column(name = "abri_ChlorationPost")
    private boolean abri;

    @Column(name = "type_ChlorationPost")
    private String type;

    @Column(name = "dimension_ChlorationPost")
    private double dimension;


    @Column(name = "dosage_ChlorationPost")
    private String dosage;

    @Column(name = "injection_point_ChlorationPost")
    private String injectionPoint;


    @Column(name = "pump_type_ChlorationPost")
    private String pumpType;

    @Column(name = "debit_ChlorationPost")
    private double debit;

    @Column(name = "hmt_ChlorationPost")
    private double hmt;

    @Column(name = "power_ChlorationPost")
    private double power;

    @Column(name = "pump_number_ChlorationPost")
    private double pumpNumber;

    @Column(name = "enabled_ChlorationPost")
    private boolean enabled;

    @Column(name = "state_ChlorationPost")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
