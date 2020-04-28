package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReliefValveAddDto {

    private String typeComposant;

    private String marque;

    private double presseionService;

    private double presseionEtanchiete;

    private double presseionTarage;

    private String type;
}
