package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratorAddDto {

    private String typeComposant;

    private double cuve;

    private String nature;

    private double puissance;

    private double number;
}
