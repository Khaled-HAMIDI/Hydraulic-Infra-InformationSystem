package dz.ade.pfe.port.in.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.updateouvrage.OuvrageUpdateDto;

public interface UpdateOuvrageQuery {
   Ouvrage updateOuvrage(OuvrageUpdateDto ouvrageUpdateDto, String code);
   Ouvrage getUpdatedOuvrage(String code);
}
