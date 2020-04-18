package dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.OuvrageComponent;

import java.util.List;

public interface LoadComposantByOuvrage {
    List<OuvrageComponent> loadComposantByOuvrage(String code);
}
