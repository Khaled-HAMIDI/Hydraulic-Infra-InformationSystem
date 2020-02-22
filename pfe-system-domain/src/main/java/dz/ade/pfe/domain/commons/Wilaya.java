package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author kabouche
 * @version 1.0
 * @created 25-avr.-2018 10:42:22
 */
@Entity
@Table(name = "wilaya", schema = "pfe")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"communes"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class Wilaya extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wilaya_gen")
    @SequenceGenerator(name = "wilaya_gen", sequenceName = "wilaya_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;

    @OneToMany(mappedBy = "wilaya", cascade = CascadeType.ALL)
    private List<Commune> communes = new ArrayList<>();

    public void addCommune(Commune commune) {
        communes.add(commune);
        commune.setWilaya(this);
    }

    public void removeCommune(Commune commune) {
        communes.remove(commune);
        commune.setWilaya(null);
    }
}
