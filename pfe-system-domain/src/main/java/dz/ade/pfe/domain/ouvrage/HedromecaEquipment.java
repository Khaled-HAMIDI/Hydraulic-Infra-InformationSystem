package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;

import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class HedromecaEquipment extends Component {

    @Column(name = "equipement_type_hedromeca_equipment")
    private String equipementType;

    @Column(name = "type_hedromeca_equipment")
    private String type;

    @Column(name = "number_hedromeca_equipment")
    private double number;

    @Column(name = "dn_hedromeca_equipment")
    private double dn;

    @Column(name = "pn_hedromeca_equipment")
    private double pn;

    @Column(name = "materials_hedromeca_equipment")
    private String materials;

    @Column(name = "state_hedromeca_equipment")
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "observation_hedromeca_equipment")
    private String observation;
}
