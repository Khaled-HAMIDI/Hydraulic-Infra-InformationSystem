package dz.ade.pfe.domain.admin;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

/**
 * @author kabouche
 * @version 1.0
 * @created 7/22/2018
 */

@Entity
@Table(name = "center", schema = "pfe")
@DiscriminatorValue("CENTER")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"unit"}, callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Center extends OrganisationalStructure {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;

}
