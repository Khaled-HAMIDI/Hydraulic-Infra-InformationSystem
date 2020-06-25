package dz.ade.pfe.service.ouvrage.createouvrage;


import dz.ade.pfe.domain.ouvrage.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OuvrageAddDto {

    private String code;

    private String name;

    @Enumerated(EnumType.STRING)
    private OuvrageType type;

    private boolean enabled;

    @Enumerated(EnumType.STRING)
    private OuvrageFormType form;

    private String site;

    private String center;

    @Enumerated(EnumType.STRING)
    private State state;

    @Enumerated(EnumType.STRING)
    private ProcessType process;

    private Integer nbCompartment;

    private Double raftRating;

    private Double coteTropFull;

    private Double coordinateX;

    private Double coordinateY;

    private Double coordinateZ;

    private Double area;

    private Double installedCapacity;

    private Double currentCapacity;

    private Double hmt;

    private Double power;

    private Integer nbPump;

    private Double pumpDebit;

    private String constructionType;

    @Enumerated(EnumType.STRING)
    private SourceType waterSource;

    private LocalDate commissioningDate;

    private LocalDate operatingDate;

    private String maitreOuvrage;

    private Double realizationCost;

    private Boolean remoteManagement;

    private Boolean waterTank;

    private Double tankCapacity1;

    private Double tankCapacity2;

    private Boolean specializedLine;

    private Boolean abri;

    private Double energyMonthlyBill;

    private Integer totalWorkforce;

    private Boolean distribution;

    private Double populationServed;

    private Double chemicalMonthlyBill;

    private Double coteTn;

    private Double debitLoadBreaker;

    private Double chargesAmontEtAval;

    private Double currentDebit;

    private Double exploitationDebit;

    private Boolean electricAlimentation;

    @Enumerated(EnumType.STRING)
    private TankType tankType;

    @Enumerated(EnumType.STRING)
    private TankRole tankRole;

    @Enumerated(EnumType.STRING)
    private TraitementStationType treatmentStationType;

    public boolean getEnabled() {
        return this.enabled;
    }
}

