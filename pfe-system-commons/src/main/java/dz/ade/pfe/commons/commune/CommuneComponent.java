package dz.ade.pfe.commons.commune;

import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.domain.commons.Wilaya;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/13/2018
 */
public interface CommuneComponent {

    Optional<Commune> getCommune(String code);

    List<Commune> getCommuneByWilaya(String code);

    List<Wilaya> getAllWilaya();
}
