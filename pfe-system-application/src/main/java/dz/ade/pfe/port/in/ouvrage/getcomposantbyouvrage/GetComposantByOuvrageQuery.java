package dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.OuvrageComponent;

import java.util.List;

public interface GetComposantByOuvrageQuery {
    List<OuvrageComponent> getComposantByOuvrage(String code);
}

