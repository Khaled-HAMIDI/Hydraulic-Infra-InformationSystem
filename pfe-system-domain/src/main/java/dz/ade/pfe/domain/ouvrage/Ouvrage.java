package dz.ade.pfe.domain.ouvrage;

import dz.ade.pfe.domain.admin.OrganisationalStructure;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @Enumerated(EnumType.STRING)
    private OuvrageType type;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "declassed")
    private Boolean declassed;

    @Column(name = "form")
    @Enumerated(EnumType.STRING)
    private OuvrageFormType form;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "cycle")
    @Enumerated(EnumType.STRING)
    private Cycle cycle;

    @Column(name = "process")
    @Enumerated(EnumType.STRING)
    private ProcessType process;

    @Column(name = "nb_compartment")
    private Integer nbCompartment;

    /*type de station de traitement*/
    @Column(name = "treatment_station_type")
    @Enumerated(EnumType.STRING)
    private TraitementStationType treatmentStationType;

    /*Cote du radier */
    @Column(name = "raft_rating")
    private Double raftRating;

    /*cote trop plein */
    @Column(name = "cote_trop_full")
    private Double coteTropFull;

    /*capacité du reservoir*/
    @Column(name = "tank_capacity1")
    private Double tankCapacity1;

    /*role du reservoir*/
    @Column(name = "tank_role")
    @Enumerated(EnumType.STRING)
    private TankRole tankRole;

    /*type réservoir*/
    @Column(name = "tank_type")
    @Enumerated(EnumType.STRING)
    private TankType tankType;

    /* alimentation electrique */
    @Column(name = "electric_alimentation")
    private Boolean electricAlimentation;

    /*debit exploitation forage*/
    @Column(name = "exploitation_debit")
    private Double exploitationDebit;

    /*debit actuel forage*/
    @Column(name = "current_debit")
    private Double currentDebit;

    /*Charges amont et aval brise charge*/
    @Column(name = "charges_amont_et_aval")
    private Double chargesAmontEtAval;

    /*debit brise charge*/
    @Column(name = "debit_load_breaker")
    private Double debitLoadBreaker;

    /*Brise charge cote tn*/
    @Column(name = "cote_tn")
    private Double coteTn;


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
    @Enumerated(EnumType.STRING)
    private SourceType waterSource;

    @Column(name = "commissioning_date")
    private LocalDate commissioningDate;

    @Column(name = "operating_date")
    private LocalDate operatingDate;

    @Column(name = "maitre_ouvrage")
    private String maitreOuvrage;

    @Column(name = "realization_cost")
    private Double realizationCost;

    @Column(name = "remote_management")
    private Boolean remoteManagement;

    /*existance bache a haut*/
    @Column(name = "water_tank")
    private Boolean waterTank;

    /*capacité bache a haut*/
    @Column(name = "tank_capacity2")
    private Double tankCapacity2;

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

    /*facture de consommation des produits chimiques*/
    @Column(name = "chemical_monthly_bill")
    private Double chemicalMonthlyBill;

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<OuvrageChain> chains = new ArrayList<>();

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<WorkStopTimes> workStopTimes = new ArrayList<>();

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<CycleOuvrage> cycles = new ArrayList<>();

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<ExploitationReading> readings = new ArrayList<>();

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL)
    @Builder.Default
    protected List<Component> components = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id")
    private Site site;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unit_id")
    private OrganisationalStructure unit;

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<InventoryOuvrage> inventories = new ArrayList<>();

    @OneToMany(mappedBy = "ouvrage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    protected List<ExploitationUser> personnels = new ArrayList<>();

}

