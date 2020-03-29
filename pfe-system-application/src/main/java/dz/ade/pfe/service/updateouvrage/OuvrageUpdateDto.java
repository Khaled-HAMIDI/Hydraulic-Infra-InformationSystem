package dz.ade.pfe.service.updateouvrage;

import dz.ade.pfe.domain.ouvrage.EnumEtat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OuvrageUpdateDto {

    private double currentCapacity;

    private Double power;

    private Double pumpDebit;

    @Enumerated(EnumType.STRING)
    private EnumEtat state;

    /* En cas de nouvelles batiments sont installées ...*/
    private Double populationServed;
}
