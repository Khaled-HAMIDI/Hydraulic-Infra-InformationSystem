package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "bank", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bank extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bank_gen")
    @SequenceGenerator(name = "bank_gen", sequenceName = "bank_seq",
            schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "designation")
    private String designation;
}
