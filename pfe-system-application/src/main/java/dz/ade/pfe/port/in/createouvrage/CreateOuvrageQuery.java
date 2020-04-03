package dz.ade.pfe.port.in.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;

public interface CreateOuvrageQuery {
    Ouvrage createOuvrage(Ouvrage ouvrage);
}
