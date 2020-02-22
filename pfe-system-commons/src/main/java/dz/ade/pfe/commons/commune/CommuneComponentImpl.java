package dz.ade.pfe.commons.commune;

import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.domain.commons.Wilaya;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CommuneComponentImpl implements CommuneComponent {

    private JpaCommuneRepository jpaCommuneRepository;
    private JpaWilayaRepository jpaWilayaRepository;

    public CommuneComponentImpl(JpaCommuneRepository jpaCommuneRepository,
                                JpaWilayaRepository jpaWilayaRepository) {
        this.jpaCommuneRepository = jpaCommuneRepository;
        this.jpaWilayaRepository = jpaWilayaRepository;
    }

    @Override
    public Optional<Commune> getCommune(String code) {
        return jpaCommuneRepository.findOneByCode(code);
    }

    @Override
    public List<Commune> getCommuneByWilaya(String code) {
        return jpaCommuneRepository.findByWilayaCode(code);
    }

    @Override
    public List<Wilaya> getAllWilaya() {
        return jpaWilayaRepository.findAll();
    }
}
