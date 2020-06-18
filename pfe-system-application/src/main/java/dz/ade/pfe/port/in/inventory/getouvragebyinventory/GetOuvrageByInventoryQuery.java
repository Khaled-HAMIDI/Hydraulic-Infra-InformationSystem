package dz.ade.pfe.port.in.inventory.getouvragebyinventory;

import dz.ade.pfe.service.inventory.getouvragebyinventory.InventoryShowDto;
import dz.ade.pfe.service.inventory.getouvragebyinventory.OuvrageInventoryDto;

import java.time.LocalDate;
import java.util.List;

public interface GetOuvrageByInventoryQuery {
    List<OuvrageInventoryDto> getOuvrageByInventory(String user);
    List<Boolean> getOuvrageStatusByInventory(String user);
    List<LocalDate> getDateByOuvrage(String user);
    LocalDate getInventoryDate(String user);
    InventoryShowDto getCurrentInventory(String unitCode);
}
