package dz.ade.pfe.port.in.getouvragedetails;

import dz.ade.pfe.service.getouvragedetails.OuvrageDto;

public interface GetOuvrageDetailsQuery {
    OuvrageDto getOuvrageDetails(String code);
}
