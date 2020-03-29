package dz.ade.pfe.domain.ouvrage;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import dz.ade.pfe.domain.commons.Auditing;


@Entity
@Table(name = "ouvrage", schema = "pfe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ouvrage extends Auditing{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ouvrage_gen")
    @SequenceGenerator(name = "ouvrage_gen", sequenceName = "ouvrage_seq", schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "form")
    @Enumerated(EnumType.STRING)
    private EnumForm form;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Column(name = "process")
    private String process;

    @Column(name = "nb_compartment")
    private Integer nbCompartment;

    @Column(name = "raft_rating")
    private Double raftRating;

    @Column(name = "cote_trop_full")
    private Double coteTropFull;

    @Column(name = "coordinate_x")
    private Double coordinateX;

    @Column(name = "coordinate_y")
    private Double coordinateY;

    @Column(name = "coordinate_Z")
    private Double coordinateZ;

    @Column(name = "area")
    private Double area;

    @Column(name = "installed_capacity")
    private Double installedCapacity;

    @Column(name = "current_capacity")
    private Double currentCapacity;

    @Column(name = "hmt")
    private Double hmt;

    @Column(name = "power")
    private Double power;

    @Column(name = "nb_pump")
    private Integer nbPump;

    @Column(name = "pump_debit")
    private Double pumpDebit;

    @Column(name = "construction_type")
    private String constructionType;

    @Column(name = "water_source")
    private String water_source;

    @Column(name = "commissioning_date")
    private LocalDate commissioningDate;

    @Column(name = "operating_date")
    private LocalDate operatingDate;

    @Column(name = "maitre_ouvrage")    
    private String maitre_ouvrage;

    @Column(name = "realization_cost")
    private Double realizationCost;

    @Column(name = "remote_management")
    private Boolean remoteManagement;

    @Column(name = "water_tank")
    private Boolean waterTank;

    @Column(name = "tank_capacity")
    private Double tankCapacity;

    @Column(name = "specialized_line")
    private Boolean specializedLine;

    @Column(name = "abri")
    private Boolean abri;

    @Column(name = "energy_monthly_bill")
    private Double energyMonthlyBill;

    @Column(name = "total_workforce")
    private Integer totalWorkforce;

    @Column(name = "distribution")
    private Boolean distribution;

    @Column(name = "population_served")
    private Double populationServed;


}

