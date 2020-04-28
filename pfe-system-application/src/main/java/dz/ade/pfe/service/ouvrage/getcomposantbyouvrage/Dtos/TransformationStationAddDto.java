package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransformationStationAddDto {

    private String typeComposant;

    private String marque;

    private double puissance;

    private double up;

    private double is;

    private double ucc;

    private String couplage;

    private String natureHuile;

    private String natureAbri;

    private double pmt;

    private double pbt;

    private double pmd;

    private double tarif;

    private double pma;

    private String typeComptage;
}
