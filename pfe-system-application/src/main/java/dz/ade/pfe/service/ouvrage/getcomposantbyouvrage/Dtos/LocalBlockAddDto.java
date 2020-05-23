package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.State;
import dz.ade.pfe.domain.ouvrage.LocalBlocNature;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocalBlockAddDto {

    private String typeComposant;

    private double area;

    @Enumerated(EnumType.STRING)
    private LocalBlocNature nature;

    @Enumerated(EnumType.STRING)
    private State state;
}
