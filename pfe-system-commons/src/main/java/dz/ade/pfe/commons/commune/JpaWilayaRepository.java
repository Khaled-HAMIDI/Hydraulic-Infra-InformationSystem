package dz.ade.pfe.commons.commune;

import dz.ade.pfe.domain.commons.Wilaya;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaWilayaRepository {

    Wilaya save(Wilaya wilaya);

    List<Wilaya> findAll();

    List<Wilaya> findByOrderById();

    Optional<Wilaya> findOneByCode(String code);

}
