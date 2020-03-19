package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.getouvragedetails.LoadOuvrageDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OuvragePersistenceAdapter implements LoadOuvrageDetails {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public Ouvrage loadOuvrageDetails(String code) {
        return ouvrageRepository.getOne((long) 1);
    }
}
