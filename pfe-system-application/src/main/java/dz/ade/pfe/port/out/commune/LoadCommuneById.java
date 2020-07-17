package dz.ade.pfe.port.out.commune;


import dz.ade.pfe.domain.commons.Commune;

import java.util.Optional;

public interface LoadCommuneById {

    Optional<Commune> loadCommuneByCode(String code);
}
