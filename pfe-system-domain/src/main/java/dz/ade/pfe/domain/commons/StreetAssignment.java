package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

/**
 * @author ain alouane
 * @version 1.0
 * @created 26/05/2019
 */
@Entity
@Table(name = "street_assignment", schema = "pfe")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"street"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class StreetAssignment extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "street_assignment_gen")
    @SequenceGenerator(name = "street_assignment_gen", sequenceName = "street_assignment_seq",
            schema = "pfe", allocationSize = 1)
    protected Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "street_id")
    private Street street;
}
