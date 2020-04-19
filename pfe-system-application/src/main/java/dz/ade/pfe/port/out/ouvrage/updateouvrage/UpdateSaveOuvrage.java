package dz.ade.pfe.port.out.ouvrage.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.updateouvrage.OuvrageUpdateDto;

public interface UpdateSaveOuvrage {

    Ouvrage updateSaveOuvrage(OuvrageUpdateDto ouvrageUpdateDto, String code);

    Ouvrage getUpdatedOuvrage(String code);

}
