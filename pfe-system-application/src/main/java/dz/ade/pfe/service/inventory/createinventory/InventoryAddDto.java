package dz.ade.pfe.service.inventory.createinventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryAddDto {

    private String code;
    private LocalDate date;
    private String responsable;
    private boolean completed;
    private List<Object> responsablesOuvrage;

    public boolean getCompleted() {
        return this.completed;
    }
}
