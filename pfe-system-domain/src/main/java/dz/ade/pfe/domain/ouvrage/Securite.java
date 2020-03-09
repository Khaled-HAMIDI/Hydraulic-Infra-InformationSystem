package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

@Entity
@Table(name = "securite", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Securite {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "securite_gen")
    @SequenceGenerator(name = "securite_gen", sequenceName = "securite_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "cloture")
    private boolean cloture;

    @Column(name = "nature")
    private String nature;

    @Column(name = "guerite")
    private double guerite;

    @Column(name = "agents_securite")
    private double agents_securite;

    @Column(name = "armement")
    private boolean armement;

    @Column(name = "telesurveillance")
    private boolean telesurveillance;

    @Column(name = "acces")
    private String acces;

}
