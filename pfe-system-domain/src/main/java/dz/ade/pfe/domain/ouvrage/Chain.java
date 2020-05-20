package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import dz.ade.pfe.domain.commons.Auditing;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "chain", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chain extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chaine_gen")
    @SequenceGenerator(name = "chaine_gen", sequenceName = "chaine_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "chain", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<OuvrageChain> ouvrages = new ArrayList<>();

}

