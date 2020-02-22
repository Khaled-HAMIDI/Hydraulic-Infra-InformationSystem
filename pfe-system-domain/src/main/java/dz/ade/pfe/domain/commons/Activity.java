package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Bensalem
 * @version 1.0
 * @created 09-mar.-2019 10:42:22
 */
@Entity
@Table(name = "activity", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_gen")
    @SequenceGenerator(name = "activity_gen", sequenceName = "activity_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL)
    @Builder.Default
    private List<SousActivity> sousActivities = new ArrayList<>();
}
