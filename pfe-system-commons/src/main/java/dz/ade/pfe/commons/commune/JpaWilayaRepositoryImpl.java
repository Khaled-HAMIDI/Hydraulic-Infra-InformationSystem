package dz.ade.pfe.commons.commune;

import dz.ade.pfe.domain.commons.Wilaya;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author kabouche
 * @version 1.0
 * @created 8/13/2018
 */
interface JpaWilayaRepositoryImpl extends JpaWilayaRepository, JpaRepository<Wilaya, Long> {

    List<Wilaya> findByOrderById();

    Optional<Wilaya> findOneByCode(String code);
}

