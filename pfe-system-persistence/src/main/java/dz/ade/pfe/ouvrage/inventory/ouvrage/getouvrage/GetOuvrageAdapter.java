package dz.ade.pfe.ouvrage.inventory.ouvrage.getouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.ouvrage.getouvrage.LoadOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GetOuvrageAdapter implements LoadOuvrage {

    private final OuvrageRepository ouvrageRepository;

    @Override
    public Ouvrage getOuvrage(String code) {

        return ouvrageRepository.findByCode(code);
    }
}
