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

    @Column(name = "capacity_traitement_station_equipement")
    private double capacity;

    @Column(name = "type_equipement_traitement_station_equipement")
    private String typeEquipement;

    @Column(name = "type_traitement_station_equipement")
    private String type;

    @Column(name = "number_traitement_station_equipement")
    private double number;

    @Column(name = "form_traitement_station_equipement")
    private String form;

    @Column(name = "nature_traitement_station_equipement")
    private String nature;

    @Column(name = "state_traitement_station_equipement")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "enabled_traitement_station_equipement")
    private boolean enabled;
}
