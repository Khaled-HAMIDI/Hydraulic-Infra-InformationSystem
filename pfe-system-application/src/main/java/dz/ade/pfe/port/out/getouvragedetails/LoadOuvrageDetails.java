package dz.ade.pfe.port.out.getouvragedetails;


import dz.ade.pfe.domain.ouvrage.Ouvrage;

public interface LoadOuvrageDetails {
    Ouvrage loadOuvrageDetails(String code);
}
