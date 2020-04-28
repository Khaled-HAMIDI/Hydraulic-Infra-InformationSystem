package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembraneKitAddDto {

    private String typeComposant;

    private String caracteristique;

    private Double nombre;
}
