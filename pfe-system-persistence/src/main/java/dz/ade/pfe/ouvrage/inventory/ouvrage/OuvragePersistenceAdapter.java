package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.ouvrage.getouvragelist.LoadOuvrageList;
import dz.ade.pfe.port.out.ouvrage.getouvragesynoptic.LoadOuvrageSynoptic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OuvragePersistenceAdapter implements LoadOuvrageList, LoadOuvragesByCodes, LoadOuvrageSynoptic {

    private final OuvrageRepository ouvrageRepository;


    @Override
    public List<Ouvrage> loadOuvrageList() {
        return ouvrageRepository.findAll();
    }

    @Override
    public List<Ouvrage> loadOuvragesByCodes(List<String> ouvrages) {
        return ouvrageRepository.loadAllOuvrages(ouvrages);
    }

    @Override
    public List<Ouvrage> loadOuvrageSynoptic(String code) {
        if (code.equals("all"))
            return ouvrageRepository.findAllForSynoptic();
        else
            return ouvrageRepository.findAllForSynopticByCode(code);
    }
}
