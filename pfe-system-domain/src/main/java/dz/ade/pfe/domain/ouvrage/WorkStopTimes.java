package dz.ade.pfe.domain.ouvrage;

import dz.ade.pfe.domain.commons.Auditing;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "work_times", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkStopTimes extends Auditing {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "work_times_gen")
    @SequenceGenerator(name = "work_times_gen", sequenceName = "work_times_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "start")
    private Date start;

    @Column(name = "stop")
    private Date stop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ouvrage_id")
    private Ouvrage ouvrage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reading_id")
    private ExploitationReading reading;
}
