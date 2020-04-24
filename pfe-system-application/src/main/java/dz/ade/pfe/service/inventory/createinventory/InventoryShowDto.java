package dz.ade.pfe.service.inventory.createinventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryShowDto {
    private String code;
    private LocalDate date;
    private Boolean completed;
}
