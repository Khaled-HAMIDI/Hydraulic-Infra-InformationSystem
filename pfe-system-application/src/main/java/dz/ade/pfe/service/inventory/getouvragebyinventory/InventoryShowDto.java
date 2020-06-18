package dz.ade.pfe.service.inventory.getouvragebyinventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryShowDto {

    private String code;

    private LocalDate date;

    private LocalDate finishDate;

    private Boolean completed;
}
