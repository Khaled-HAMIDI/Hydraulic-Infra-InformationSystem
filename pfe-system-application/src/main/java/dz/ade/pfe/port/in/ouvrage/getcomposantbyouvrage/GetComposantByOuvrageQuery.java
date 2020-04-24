package dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.Component;

import java.util.List;

public interface GetComposantByOuvrageQuery {
    List<Component> getComposantByOuvrage(String code);
}

