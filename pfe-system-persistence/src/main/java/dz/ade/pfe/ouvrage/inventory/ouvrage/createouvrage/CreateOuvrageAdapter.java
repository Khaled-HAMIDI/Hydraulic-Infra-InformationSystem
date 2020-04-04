package dz.ade.pfe.ouvrage.inventory.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.createouvrage.SaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreateOuvrageAdapter implements SaveOuvrage {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public Ouvrage saveOuvrage(Ouvrage ouvrage) {
        ouvrageRepository.save(ouvrage);
        return ouvrage;
    }
}
