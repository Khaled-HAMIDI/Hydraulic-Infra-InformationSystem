package dz.ade.pfe.domain.commons;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "prise_eau", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriseEau {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prise_eau_gen")
    @SequenceGenerator(name = "prise_eau_gen", sequenceName = "prise_eau_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "dimension")
    private String dimension;
}