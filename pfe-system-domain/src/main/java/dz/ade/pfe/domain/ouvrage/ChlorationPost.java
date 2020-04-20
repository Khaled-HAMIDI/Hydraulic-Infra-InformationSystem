package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "chloration_post", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChlorationPost extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chloration_post_gen")
    @SequenceGenerator(name = "chloration_post_gen", sequenceName = "chloration_post_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "abri")
        private boolean abri;

    @Column(name = "type")
    private String type;

    @Column(name = "dimension")
    private double dimension;


    @Column(name = "dosage")
    private String dosage;

    @Column(name = "injection_point")
    private String injectionPoint;


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

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
