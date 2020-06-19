package dz.ade.pfe.port.out.inventory.getouvragebyinventory;

import dz.ade.pfe.domain.ouvrage.Inventory;
import dz.ade.pfe.domain.ouvrage.Ouvrage;

import java.time.LocalDate;
import java.util.List;

public interface LoadOuvrageByInventory {

    List<Ouvrage> loadOuvrageByCurrentInventory(String user);

    List<Ouvrage> loadOuvrageByInventory(String codeInventory, String user);

    List<Boolean> loadOuvrageStatusByInventory(String user);

    List<LocalDate> loadDateByOuvrage(String user);

    List<LocalDate> loadDateByOuvrageByInventory(String codeInventory,String user);

    LocalDate loadInventoryDate(String user);

    Inventory loadCurrentInventory(String unitCode);
}
