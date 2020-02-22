package dz.ade.pfe.domain.admin;

import dz.ade.pfe.domain.commons.District;
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
@Table(name = "agency", schema = "pfe")
@DiscriminatorValue("AGENCY")
@Getter
@Setter
@EqualsAndHashCode(exclude = { "districts",
        }, callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Agency extends OrganisationalStructure {

    @Column(name = "agency_type")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AgencyType agencyType = AgencyType.AGENCY;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;

    @OneToMany(mappedBy = "agency", cascade = CascadeType.ALL)
    @Builder.Default
    private List<District> districts = new ArrayList<>();

    public void addDistrict(District district) {
        districts.add(district);
        district.setAgency(this);
    }

    public void removeDistrict(District district) {
        districts.remove(district);
        district.setAgency(null);
    }
}
