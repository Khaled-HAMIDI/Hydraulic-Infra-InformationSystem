package dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.Component;

import java.util.List;

public interface LoadComposantByOuvrage {
    List<Component> loadComposantByOuvrage(String code);
}
