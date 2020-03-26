package dz.ade.pfe.domain.ouvrage;

import io.advantageous.boon.core.Str;
import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "metering_pump", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeteringPump extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pompe_doseuse_gen")
    @SequenceGenerator(name = "pompe_doseuse_gen", sequenceName = "pompe_doseuse_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    /*C'est demandé de le laisser commme un chaps de saisie*/
    @Column(name = "type")
    private String type;

    @Column(name = "debit")
    private double debit;

    @Column(name = "hmt")
    private String hmt;

    @Column(name = "power")
    private double power;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "mode")
    @Enumerated(EnumType.STRING)
    private EnumModePompe mode;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;
}
