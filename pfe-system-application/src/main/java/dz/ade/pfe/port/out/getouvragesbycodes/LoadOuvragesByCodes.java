package dz.ade.pfe.port.out.getouvragesbycodes;

import dz.ade.pfe.domain.ouvrage.Ouvrage;

import java.util.List;

public interface LoadOuvragesByCodes {
    public List<Ouvrage> loadOuvragesByCodes(List<String> ouvrages);
}
