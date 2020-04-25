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

    @Column(name = "equipement_type_HedromecaEquipment")
    private String equipementType;

    @Column(name = "type_HedromecaEquipment")
    private String type;

    @Column(name = "number_HedromecaEquipment")
    private double number;

    @Column(name = "dn_HedromecaEquipment")
    private double dn;

    @Column(name = "pn_HedromecaEquipment")
    private double pn;

    @Column(name = "materials_HedromecaEquipment")
    private String materials;

    @Column(name = "state_HedromecaEquipment")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "observation_HedromecaEquipment")
    private String observation;
}
