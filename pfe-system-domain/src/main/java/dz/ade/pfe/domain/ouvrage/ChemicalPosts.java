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
public class ChemicalPosts extends Component {

    @Column(name = "post_type_ChemicalPosts")
    private String postType;

    @Column(name = "type_ChemicalPosts")
    private String type;

    @Column(name = "dimension_ChemicalPosts")
    private double dimension;

    @Column(name = "form_ChemicalPosts")
    private String form;

    @Column(name = "post_number_ChemicalPosts")
    private double postNumber;

    @Column(name = "implantation_place_ChemicalPosts")
    private String implantaionPlace;

    @Column(name = "injection_point_ChemicalPosts")
    private String injectionPoint;

    @Column(name = "injection_ChemicalPosts")
    @Enumerated(EnumType.STRING)
    private EnumModePompe injection;

    @Column(name = "pump_type_ChemicalPosts")
    private String pumpType;

    @Column(name = "debit_ChemicalPosts")
    private double debit;

    @Column(name = "hmt_ChemicalPosts")
    private double hmt;

    @Column(name = "power_ChemicalPosts")
    private double power;

    @Column(name = "pump_number_ChemicalPosts")
    private double pumpNumber;

    @Column(name = "enabled_ChemicalPosts")
    private boolean enabled;

    @Column(name = "mode_ChemicalPosts")
    @Enumerated(EnumType.STRING)
    private EnumModePompe mode;

    @Column(name = "state_ChemicalPosts")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
