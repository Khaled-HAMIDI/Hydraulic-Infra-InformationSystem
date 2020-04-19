package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.ouvrage.getouvragedetails.LoadOuvrageDetails;
import dz.ade.pfe.port.out.ouvrage.getouvragelist.LoadOuvrageList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OuvragePersistenceAdapter implements LoadOuvrageDetails, LoadOuvrageList, LoadOuvragesByCodes {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public Ouvrage loadOuvrageDetails(String code) {
        return ouvrageRepository.getOne((long) 1);
    }
    @Override
    public List<Ouvrage> loadOuvrageList() {
        return ouvrageRepository.findAll();
    }

    @Override
    public List<Ouvrage> loadOuvragesByCodes(List<String> ouvrages) {
        return ouvrageRepository.loadAllOuvrages(ouvrages);
    }
}
