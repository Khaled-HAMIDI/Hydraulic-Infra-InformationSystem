package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "security", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Security extends OuvrageComponent{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "securite_gen")
    @SequenceGenerator(name = "securite_gen", sequenceName = "securite_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "closing")
    private boolean closing;

    @Column(name = "nature")
    @Enumerated(EnumType.STRING)
    private EnumNatureSecurity nature;

    @Column(name = "entry_box")
    private double entryBox;

    @Column(name = "nb_agents")
    private double nbAgents;

    @Column(name = "weaponry")
    private boolean weaponry;

    @Column(name = "remote_monitoring")
    private boolean remoteMonitoring;

    @Column(name = "access")
    @Enumerated(EnumType.STRING)
    private EnumEtat access;

}
