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
public class Security extends Component {

    @Column(name = "closing_Security")
    private boolean closing;

    @Column(name = "nature_Security")
    @Enumerated(EnumType.STRING)
    private EnumNatureSecurity nature;

    @Column(name = "entry_box_Security")
    private double entryBox;

    @Column(name = "nb_agents_Security")
    private double nbAgents;

    @Column(name = "weaponry_Security")
    private boolean weaponry;

    @Column(name = "remote_monitoring_Security")
    private boolean remoteMonitoring;

    @Column(name = "access_Security")
    @Enumerated(EnumType.STRING)
    private EnumEtat access;

}
