package dz.ade.pfe.ouvrage.inventory.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.Component;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Component
@RequiredArgsConstructor
public class GetComposantByOuvrageAdapter implements LoadComposantByOuvrage {


    private final OuvrageRepository ouvrageRepository;

    @Override
    public List<Component> loadComposantByOuvrage(String code){

        Ouvrage ouvrage=ouvrageRepository.findByCode(code);
        return ouvrage.getComponents();
    }
}

