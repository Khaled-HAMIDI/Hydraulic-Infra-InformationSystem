package dz.ade.pfe.port.in.inventory.getouvragebyinventory;

import dz.ade.pfe.domain.ouvrage.Ouvrage;

import java.util.List;

public interface GetOuvrageByInventoryQuery {
    List<Ouvrage> getOuvrageByInventory(String code);
}
