package dz.ade.pfe.web.ouvrage.inventory.ouvrage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageDto {

    private String id;

    private String type;

    private boolean fonctionnement;

    private String etat;

    private Long commune ;

    private double capacite_installee;

    private double capacite_actuelle;

}
