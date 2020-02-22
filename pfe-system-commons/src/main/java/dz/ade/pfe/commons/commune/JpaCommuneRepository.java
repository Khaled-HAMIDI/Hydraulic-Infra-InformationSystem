package dz.ade.pfe.commons.commune;

import dz.ade.pfe.domain.commons.Commune;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaCommuneRepository {

    List<Commune> findAll();

    Optional<Commune> findOneByCode(String code);

    List<Commune> findByWilayaCode(String code);
}
