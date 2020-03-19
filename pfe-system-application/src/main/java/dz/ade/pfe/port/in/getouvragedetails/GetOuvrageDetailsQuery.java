package dz.ade.pfe.port.in.getouvragedetails;

import dz.ade.pfe.domain.ouvrage.Ouvrage;

public interface GetOuvrageDetailsQuery {
    Ouvrage getOuvrageDetails(String code);
}
