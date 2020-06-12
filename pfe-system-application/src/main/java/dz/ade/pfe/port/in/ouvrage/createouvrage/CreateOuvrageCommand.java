package dz.ade.pfe.port.in.ouvrage.createouvrage;

import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;

public interface CreateOuvrageCommand {
    OuvrageShowDto createOuvrage(OuvrageAddDto ouvrageAddDto, String unitCode);
}
