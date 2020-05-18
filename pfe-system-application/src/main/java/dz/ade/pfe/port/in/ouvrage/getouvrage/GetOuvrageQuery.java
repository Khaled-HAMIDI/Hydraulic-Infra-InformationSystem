package dz.ade.pfe.port.in.ouvrage.getouvrage;


import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;

public interface GetOuvrageQuery {
    OuvrageShowDto getOuvrage(String code);
}
