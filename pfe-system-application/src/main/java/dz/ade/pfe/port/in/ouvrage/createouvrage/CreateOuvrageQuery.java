package dz.ade.pfe.port.in.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;

public interface CreateOuvrageQuery {
    Ouvrage createOuvrage(OuvrageAddDto ouvrageAddDto);
}
