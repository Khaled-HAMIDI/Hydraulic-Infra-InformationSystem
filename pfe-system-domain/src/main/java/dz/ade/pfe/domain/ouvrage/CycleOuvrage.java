package dz.ade.pfe.domain.ouvrage;

import dz.ade.pfe.domain.commons.Auditing;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "cycle", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CycleOuvrage extends Auditing {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cycle_gen")
    @SequenceGenerator(name = "cycle_gen", sequenceName = "cycle_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "start")
    private LocalDate start;

    @Column(name = "stop")
    private LocalDate stop;

    @Column(name = "cycle")
    @Enumerated(EnumType.STRING)
    private Cycle cycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ouvrage_id")
    private Ouvrage ouvrage;
}
