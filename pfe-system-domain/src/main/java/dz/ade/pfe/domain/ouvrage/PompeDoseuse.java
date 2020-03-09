package dz.ade.pfe.domain.ouvrage;

import io.advantageous.boon.core.Str;
import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "pompe_doseuse", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PompeDoseuse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pompe_doseuse_gen")
    @SequenceGenerator(name = "pompe_doseuse_gen", sequenceName = "pompe_doseuse_seq", schema = "pfe", allocationSize = 1)
    protected Long id;


    @Column(name = "type")
    private String type;

    @Column(name = "debit")
    private double debit;

    @Column(name = "hmt")
    private String hmt;

    @Column(name = "puisssance")
    private double puissance;

    @Column(name = "fonctionnement")
    private boolean fonctionnement;

    @Column(name = "mode")
    private String mode;

    @Column(name = "etat")
    private String etat;
}
