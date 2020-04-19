package dz.ade.pfe.port.in.ouvrage.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.updateouvrage.OuvrageUpdateDto;

public interface UpdateOuvrageQuery {
   Ouvrage updateOuvrage(OuvrageUpdateDto ouvrageUpdateDto, String code);
   Ouvrage getUpdatedOuvrage(String code);
}
