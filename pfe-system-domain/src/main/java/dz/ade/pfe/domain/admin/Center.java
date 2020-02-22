package dz.ade.pfe.domain.admin;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
@EqualsAndHashCode(exclude = {"unit", "agencies"}, callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Center extends OrganisationalStructure {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private Unit unit;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Agency> agencies = new ArrayList<>();

    public void addCenter(Agency agency) {
        agencies.add(agency);
        agency.setCenter(this);
    }

    public void removeCenter(Agency agency) {
        agencies.remove(agency);
        agency.setCenter(null);
    }
}
