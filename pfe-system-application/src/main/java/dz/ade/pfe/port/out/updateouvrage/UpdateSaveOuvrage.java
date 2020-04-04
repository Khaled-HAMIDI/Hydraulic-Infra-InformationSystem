package dz.ade.pfe.port.out.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.updateouvrage.OuvrageUpdateDto;

public interface UpdateSaveOuvrage {

    Ouvrage updateSaveOuvrage(OuvrageUpdateDto ouvrageUpdateDto, String code);

    Ouvrage getUpdatedOuvrage(String code);

}
