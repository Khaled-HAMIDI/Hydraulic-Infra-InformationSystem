package dz.ade.pfe.domain.commons;

import dz.ade.pfe.domain.admin.Agency;
import lombok.*;

import javax.persistence.*;
import java.util.*;

/**
 * @author Bensalem
 * @version 1.0
 * @created 09-mar.-2019 10:42:22
 */
@Entity
@Table(name = "district", schema = "pfe")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"agency", "streets"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class District extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "district_gen")
    @SequenceGenerator(name = "district_gen", sequenceName = "district_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "agency_id")
    protected Agency agency;

    @OneToMany(mappedBy = "district", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Street> streets = new LinkedHashSet<>();

    public void addStreet(Street street) {
        streets.add(street);
        street.setDistrict(this);
    }

    public void removeStreet(Street street) {
        streets.remove(street);
        street.setDistrict(null);
    }
}
