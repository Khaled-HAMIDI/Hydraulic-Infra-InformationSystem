package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

/**
 * @author Bensalem
 * @version 1.0
 * @created 25-avr.-2018 10:42:40
 */
@Entity
@Table(name = "guardianship", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Guardianship extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "guardianship_gen")
    @SequenceGenerator(name = "guardianship_gen", sequenceName = "guardianship_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;
}
