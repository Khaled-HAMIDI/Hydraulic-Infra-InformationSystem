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

    @Column(name = "closing_security")
    private boolean closing;

    @Column(name = "nature_security")
    @Enumerated(EnumType.STRING)
    private SecurityNature nature;

    @Column(name = "entry_box_security")
    private double entryBox;

    @Column(name = "nb_agents_security")
    private double nbAgents;

    @Column(name = "weaponry_security")
    private boolean weaponry;

    @Column(name = "remote_monitoring_security")
    private boolean remoteMonitoring;

    @Column(name = "access_security")
    @Enumerated(EnumType.STRING)
    private State access;

}
