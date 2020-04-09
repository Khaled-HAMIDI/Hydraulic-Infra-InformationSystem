package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

/**
 * @author kabouche
 * @version 1.0
 * @created 25-avr.-2018 10:42:51
 */
@Entity
@Table(name = "commune", schema = "pfe")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"wilaya"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class Commune extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "commune_gen")
    @SequenceGenerator(name = "commune_gen", sequenceName = "commune_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "connected_to_ona_network")
    private Boolean connectedToOnaNetwork = true;

    @Column(name = "designation")
    private String designation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wilaya_id")
    private Wilaya wilaya;

}
