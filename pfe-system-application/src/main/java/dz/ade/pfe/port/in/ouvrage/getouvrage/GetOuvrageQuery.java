package dz.ade.pfe.port.in.ouvrage.getouvrage;


import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageShowDto;

public interface GetOuvrageQuery {
    OuvrageShowDto getOuvrage(String code);
}
