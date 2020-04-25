package dz.ade.pfe.port.out.ouvrage.getouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;

public interface LoadOuvrage {

    Ouvrage getOuvrage(String code);
}
