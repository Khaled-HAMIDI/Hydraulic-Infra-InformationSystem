package dz.ade.pfe.port.out.updateouvrage;

import dz.ade.pfe.service.updateouvrage.OuvrageUpdateDto;

public interface UpdateSaveOuvrage {
    String updateSaveOuvrage(OuvrageUpdateDto ouvrageUpdateDto, int id);
}
