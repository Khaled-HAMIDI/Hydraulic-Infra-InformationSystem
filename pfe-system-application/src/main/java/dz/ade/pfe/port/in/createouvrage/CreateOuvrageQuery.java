package dz.ade.pfe.port.in.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.createouvrage.OuvrageAddDto;

public interface CreateOuvrageQuery {
    Ouvrage createOuvrage(OuvrageAddDto ouvrageAddDto);
}
