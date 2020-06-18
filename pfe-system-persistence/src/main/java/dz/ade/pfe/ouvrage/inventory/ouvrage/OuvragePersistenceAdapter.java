package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.exploitation.getouvrages.LoadOuvragesExploitation;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.ouvrage.getouvragelist.LoadOuvrageList;
import dz.ade.pfe.port.out.ouvrage.getouvragesynoptic.LoadOuvrageSynoptic;
import dz.ade.pfe.service.exploitation.getouvrages.OuvrageExploitationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class OuvragePersistenceAdapter implements LoadOuvrageList, LoadOuvragesByCodes, LoadOuvrageSynoptic, LoadOuvragesExploitation {

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
    public Ouvrage loadOuvrageByCode(String code) {
        return ouvrageRepository.findByCode(code);
    }

    @Override
    public List<Ouvrage> loadOuvrageSynoptic(String code) {
        if (code.equals("all"))
            return ouvrageRepository.findAllForSynoptic();
        else
            return ouvrageRepository.findAllForSynopticByCode(code);
    }
    @Override
    public List<Ouvrage> loadOuvragesExploitation(){
       return Stream.concat(ouvrageRepository.loadOuvragesExploitation().stream(), ouvrageRepository.loadOuvragesNotInExploitation().stream())
                .collect(Collectors.toList());
    }
}
