package dz.ade.pfe.ouvrage.inventory.ouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.out.LoadSequelNumber;
import dz.ade.pfe.port.out.exploitation.getouvrages.LoadOuvragesExploitation;
import dz.ade.pfe.port.out.exploitation.updateouvrage.UpdateExpOuvrage;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.ouvrage.getouvragelist.LoadOuvrageList;
import dz.ade.pfe.port.out.ouvrage.getouvragesynoptic.LoadOuvrageSynoptic;
import dz.ade.pfe.port.out.ouvrage.loadnbouvrages.LoadNbOuvrages;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class OuvragePersistenceAdapter implements LoadOuvrageList, UpdateExpOuvrage, LoadOuvragesByCodes, LoadOuvrageSynoptic, LoadOuvragesExploitation, LoadNbOuvrages, LoadSequelNumber {

    private final OuvrageRepository ouvrageRepository;


    @Override
    public List<Ouvrage> loadOuvrageList(String codeStructure) {
        if (codeStructure.equals("DG"))
            return ouvrageRepository.findByDeclassed(false);
        else
            return ouvrageRepository.findByUnitCode(codeStructure);
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
    public List<Ouvrage> loadOuvragesExploitation(String codeUser) {
        List<Ouvrage> list = ouvrageRepository.loadOuvragesExploitation(codeUser);
        if(list.size()>0)
            return list;
        return Stream.concat(ouvrageRepository.loadOuvragesExploitation().stream(), ouvrageRepository.loadOuvragesNotInExploitation().stream())
                .collect(Collectors.toList());
    }

    @Override
    public List<Object> loadNbOuvrages() {
        List<Object> list = ouvrageRepository.loadNbOuvrages();
        Object obj = ouvrageRepository.loadNbTotal();
        list.add(obj);
        obj = ouvrageRepository.loadNbAllOuvrages();
        list.add(obj);
        return list;
    }

    @Override
    public Integer getNext(String type, String code) {
        return ouvrageRepository.getNext(type,code);
    }

    @Override
    public void updateOuvrage(Ouvrage ouvrage) {
        ouvrageRepository.save(ouvrage);
    }
}
