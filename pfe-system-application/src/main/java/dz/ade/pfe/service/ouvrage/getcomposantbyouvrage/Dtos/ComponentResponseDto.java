package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage.Dtos;

import dz.ade.pfe.domain.ouvrage.ComponentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComponentResponseDto {

    private String typeComposant;
}
