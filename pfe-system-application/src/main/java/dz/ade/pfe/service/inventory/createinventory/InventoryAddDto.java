package dz.ade.pfe.service.inventory.createinventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryAddDto {

    private String code;
    private LocalDate date;
    private Long responsable;
    private boolean completed;

    public boolean getCompleted() {
        return this.completed;
    }
}
