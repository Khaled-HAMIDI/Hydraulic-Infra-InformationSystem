package dz.ade.pfe.domain.ouvrage;

import dz.ade.pfe.domain.admin.Unit;
import dz.ade.pfe.domain.admin.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "inventory", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "inventaire_gen")
    @SequenceGenerator(name = "inventaire_gen", sequenceName = "inventaire_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User headOfTheInventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "completed")
    private Boolean completed;

}

