package dz.ade.pfe.domain.admin;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.Site;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author kabouche
 * @version 1.0
 * @created 7/22/2018
 */

@Entity
@Table(name = "unit", schema = "pfe")
@DiscriminatorValue("UNIT")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"centers"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class Unit extends OrganisationalStructure {

    @Column(name = "is_deployed")
    protected boolean isDeployed;

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Center> centers = new ArrayList<>();

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Center> inventories = new ArrayList<>();

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Ouvrage> ouvrages = new ArrayList<>();

    @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Site> sites = new ArrayList<>();

    public void addCenter(Center center) {
        centers.add(center);
        center.setUnit(this);
    }

    public void removeCenter(Center center) {
        centers.remove(center);
        center.setUnit(null);
    }
}
