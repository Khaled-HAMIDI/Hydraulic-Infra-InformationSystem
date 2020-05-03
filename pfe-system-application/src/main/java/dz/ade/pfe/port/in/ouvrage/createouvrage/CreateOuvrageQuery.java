package dz.ade.pfe.port.in.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.ouvrage.getouvragedetails.OuvrageDto;

public interface CreateOuvrageQuery {
    OuvrageDto createOuvrage(OuvrageAddDto ouvrageAddDto, String unitCode);
}
