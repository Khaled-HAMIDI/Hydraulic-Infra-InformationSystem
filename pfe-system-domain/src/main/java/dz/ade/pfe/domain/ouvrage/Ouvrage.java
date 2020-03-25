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
public class Ouvrage {
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

    @Column(name = "form")
    private String form;

    @Column(name = "process")
    private String process;

    @Column(name = "nb_compartment")
    private int nbCompartment;

    @Column(name = "raft_rating")
    private double raftRating;

    @Column(name = "cote_trop_full")
    private int coteTropFull;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "state")
    private String state;

    @Column(name = "coordinate_x")
    private double coordinateX;

    @Column(name = "coordinate_y")
    private double coordinateY;

    @Column(name = "coordinate_Z")
    private double coordinateZ;

    @Column(name = "area")
    private double area;

    @Column(name = "installed_capacity")
    private double installedCapacity;

    @Column(name = "current_capacity")
    private double currentCapacity;

    @Column(name = "hmt")
    private double hmt;

    @Column(name = "power")
    private double power;

    @Column(name = "nb_pump")
    private int nbPump;

    @Column(name = "pump_debit")
    private double pumpDebit;

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
    private double realizationCost;

    @Column(name = "remote_management")
    private boolean remoteManagement;

    @Column(name = "water_tank")
    private boolean waterTank;

    @Column(name = "tank_capacity")
    private double tankCapacity;

    @Column(name = "specialized_line")
    private boolean specializedLine;

    @Column(name = "abri")
    private boolean abri;

    @Column(name = "energy_monthly_bill")
    private double energyMonthlyBill;

    @Column(name = "total_workforce")
    private int totalWorkforce;

    @Column(name = "distribution")
    private boolean distribution;

    @Column(name = "population_served")
    private double populationServed;


}

