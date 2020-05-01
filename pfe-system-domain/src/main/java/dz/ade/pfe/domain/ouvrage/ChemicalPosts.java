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

    @Column(name = "post_type_chemical_posts")
    private String postType;

    @Column(name = "type_chemical_posts")
    private String type;

    @Column(name = "dimension_chemical_posts")
    private double dimension;

    @Column(name = "form_chemical_posts")
    private String form;

    @Column(name = "post_number_chemical_posts")
    private double postNumber;

    @Column(name = "implantation_place_chemical_posts")
    private String implantaionPlace;

    @Column(name = "injection_point_chemical_posts")
    private String injectionPoint;

    @Column(name = "injection_chemical_posts")
    @Enumerated(EnumType.STRING)
    private EnumInjectionType injection;

    @Column(name = "pump_type_chemical_posts")
    private String pumpType;

    @Column(name = "debit_chemical_posts")
    private double debit;

    @Column(name = "hmt_chemical_posts")
    private double hmt;

    @Column(name = "power_chemical_posts")
    private double power;

    @Column(name = "pump_number_chemical_posts")
    private double pumpNumber;

    @Column(name = "enabled_chemical_posts")
    private boolean enabled;

    @Column(name = "mode_chemical_posts")
    @Enumerated(EnumType.STRING)
    private EnumModePompe mode;

    @Column(name = "state_chemical_posts")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
