package dz.ade.pfe.port.in.ouvrage.getouvragedetails;

import dz.ade.pfe.service.ouvrage.getouvragedetails.OuvrageDto;

public interface GetOuvrageDetailsQuery {
    OuvrageDto getOuvrageDetails(String code);
}
