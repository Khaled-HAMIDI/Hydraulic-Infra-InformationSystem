package dz.ade.pfe.service.inventory.getcomponentbyinventory;


import dz.ade.pfe.domain.ouvrage.State;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryComponentDto {

    private String componentType;

    @Enumerated(EnumType.STRING)
    private State state;

    private String gap;

    private String observation;
}
