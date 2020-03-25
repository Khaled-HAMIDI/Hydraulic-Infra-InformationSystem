package dz.ade.pfe.domain.ouvrage;

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

    @Column(name = "responsable")
    private Long responsable;

    @Column(name = "date")
    private LocalDate date;



}

