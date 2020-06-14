package dz.ade.pfe.port.in.inventory.getouvragebyinventory;

import dz.ade.pfe.service.inventory.getouvragebyinventory.OuvrageInventoryDto;

import java.util.List;

public interface GetOuvrageByInventoryQuery {
    List<OuvrageInventoryDto> getOuvrageByInventory(String user);
}
