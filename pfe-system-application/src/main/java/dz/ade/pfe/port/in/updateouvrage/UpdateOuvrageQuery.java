package dz.ade.pfe.port.in.updateouvrage;

import dz.ade.pfe.service.updateouvrage.OuvrageUpdateDto;

public interface UpdateOuvrageQuery {
   String updateOuvrage(OuvrageUpdateDto ouvrageUpdateDto, int id);
}
