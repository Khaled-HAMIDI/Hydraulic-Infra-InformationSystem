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
public class TraitementStationEquipement extends Component {

    @Column(name = "capacity_TraitementStationEquipement")
    private double capacity;

    @Column(name = "type_equipement_TraitementStationEquipement")
    private String typeEquipement;

    @Column(name = "type_TraitementStationEquipement")
    private String type;

    @Column(name = "number_TraitementStationEquipement")
    private double number;

    @Column(name = "form_TraitementStationEquipement")
    private String form;

    @Column(name = "nature_TraitementStationEquipement")
    private String nature;

    @Column(name = "state_TraitementStationEquipement")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "enabled_TraitementStationEquipement")
    private boolean enabled;
}
