package dz.ade.pfe.commons.commune;

import dz.ade.pfe.domain.commons.Wilaya;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class WilayaComponentImpl implements  WilayaComponent {

    private JpaWilayaRepository jpaWilayaRepository;

    public WilayaComponentImpl(JpaWilayaRepository jpaWilayaRepository) {
        this.jpaWilayaRepository = jpaWilayaRepository;
    }

    @Override
    public Optional<Wilaya> getWilaya(String code) {
        return jpaWilayaRepository.findOneByCode(code);
    }

}
