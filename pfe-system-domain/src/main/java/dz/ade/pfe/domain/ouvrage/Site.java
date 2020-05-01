package dz.ade.pfe.domain.ouvrage;

import dz.ade.pfe.domain.admin.Unit;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "site", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Site {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "site_gen")
    @SequenceGenerator(name = "site_gen", sequenceName = "site_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "site", cascade = CascadeType.ALL)
    @Builder.Default
    protected List<Ouvrage> ouvrages = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;

}
