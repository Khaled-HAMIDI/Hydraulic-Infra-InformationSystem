package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "anti_belier", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AntiBelier {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "anti_belier_gen")
    @SequenceGenerator(name = "anti_belier_gen", sequenceName = "anti_belier_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "marque")
    private String marque;

    @Column(name = "capacite")
    private double capacite;

    @Column(name = "pression_service")
    private double pression_service;

    @Column(name = "pression_epreuve")
    private double pression_epreuve;

    @Column(name = "pression_regonflage")
    private double pression_regonflage;

    @Column(name = "type")
    private String type;

    @Column(name = "compresseur")
    private boolean compresseur;
}
