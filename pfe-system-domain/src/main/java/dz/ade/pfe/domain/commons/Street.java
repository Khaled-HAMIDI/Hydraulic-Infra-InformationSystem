package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.util.*;

/**
 * @author kabouche
 * @version 1.0
 * @created 25-avr.-2018 10:42:40
 */
@Entity
@Table(name = "street", schema = "pfe")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"district"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Street extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "street_gen")
    @SequenceGenerator(name = "street_gen", sequenceName = "street_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @OneToMany(mappedBy = "street", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<StreetAssignment> streetAssignments = new ArrayList<>();
}
