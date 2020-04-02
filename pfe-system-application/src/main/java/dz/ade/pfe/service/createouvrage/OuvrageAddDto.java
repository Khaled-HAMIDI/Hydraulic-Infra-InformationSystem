package dz.ade.pfe.service.createouvrage;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OuvrageAddDto {
     
    private String code;

     
    private String name;

     
    private String type;

     
     
    private boolean enabled;

     
    private String form;

     
    private String state;

     
    private String process;

     
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

     
    private String waterSource;

     
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

     
    private Double totalWorkforce;

     
     
    private Boolean distribution;

     
    private Double populationServed;

}

