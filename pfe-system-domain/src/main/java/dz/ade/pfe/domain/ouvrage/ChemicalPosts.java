package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "chemical_post", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChemicalPosts extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chemical_post_gen")
    @SequenceGenerator(name = "chemical_post_gen", sequenceName = "chemical_post_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "post_type")
    private String postType;

    @Column(name = "type")
    private String type;

    @Column(name = "dimension")
    private double dimension;

    @Column(name = "form")
    private String form;

    @Column(name = "post_number")
    private double postNumber;

    @Column(name = "implantation_place")
    private String implantaionPlace;

    @Column(name = "injection_point")
    private String injectionPoint;

    @Column(name = "injection")
    @Enumerated(EnumType.STRING)
    private EnumModePompe injection;

    @Column(name = "pump_type")
    private String pumpType;

    @Column(name = "debit")
    private double debit;

    @Column(name = "hmt")
    private double hmt;

    @Column(name = "power")
    private double power;

    @Column(name = "pump_number")
    private double pumpNumber;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "mode")
    @Enumerated(EnumType.STRING)
    private EnumModePompe mode;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
