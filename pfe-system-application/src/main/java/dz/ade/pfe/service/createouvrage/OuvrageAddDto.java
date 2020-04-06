package dz.ade.pfe.service.createouvrage;


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
    private EnumTypeGeneral type;


    private boolean enabled;


    @Enumerated(EnumType.STRING)
    private EnumForm form;


    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    @Enumerated(EnumType.STRING)
    private EnumProcess process;


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
    private EnumProvenance waterSource;


    private LocalDate commissioningDate;


    private LocalDate operatingDate;


    private String maitreOuvrage;


    private Double realizationCost;



    private Boolean remoteManagement;



    private Boolean waterTank;


    private Double tankCapacity;



    private Boolean specializedLine;



    private Boolean abri;


    private Double energyMonthlyBill;


    private Integer totalWorkforce;



    private Boolean distribution;


    private Double populationServed;

    public boolean getEnabled() {
        return this.enabled;
    }
}

