package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.getouvragedetails.LoadOuvrageDetails;
import dz.ade.pfe.port.out.getouvragelist.LoadOuvrageList;
import dz.ade.pfe.port.out.getouvragesbycodes.LoadOuvragesByCodes;
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
