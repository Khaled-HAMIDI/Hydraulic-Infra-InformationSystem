package dz.ade.pfe.port.out.inventory.getouvragebyinventory;

import dz.ade.pfe.domain.ouvrage.Ouvrage;

import java.util.List;

public interface LoadOuvrageByInventory {
    List<Ouvrage> loadOuvrageByInventory(String user);
}
