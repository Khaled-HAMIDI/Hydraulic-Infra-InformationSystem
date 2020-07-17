package dz.ade.pfe.ouvrage.inventory.commune;

import dz.ade.pfe.domain.commons.Commune;
import dz.ade.pfe.port.out.commune.LoadCommuneById;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CommunePersistanceAdapter implements LoadCommuneById {

    private final CommuneRepository communeRepository;

    @Override
    public Optional<Commune> loadCommuneByCode(String code) {
        return communeRepository.findByCode(code);
    }
}
