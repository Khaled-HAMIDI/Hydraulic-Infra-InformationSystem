package dz.ade.pfe.service.ouvrage.createcomposant.Dtos;


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
