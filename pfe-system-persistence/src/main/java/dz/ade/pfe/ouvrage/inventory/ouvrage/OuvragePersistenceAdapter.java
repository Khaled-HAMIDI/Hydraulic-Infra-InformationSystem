package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.getouvragedetails.LoadOuvrageDetails;
import dz.ade.pfe.port.out.getouvragelist.LoadOuvrageList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OuvragePersistenceAdapter implements LoadOuvrageDetails, LoadOuvrageList {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public Ouvrage loadOuvrageDetails(String code) {
        return ouvrageRepository.getOne((long) 1);
    }
    @Override
    public List<Ouvrage> loadOuvrageList() {
        return ouvrageRepository.findAll();
    }
}
