package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

/**
 * @author kabouche
 * @version 1.0
 * @created 25-avr.-2018 10:42:40
 */
@Entity
@Table(name = "sous_activity", schema = "pfe")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"activity"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SousActivity extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sous_activity_gen")
    @SequenceGenerator(name = "sous_activity_gen", sequenceName = "sous_activity_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "activity_id")
    private Activity activity;
}
