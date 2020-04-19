package dz.ade.pfe.ouvrage.inventory.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.OuvrageComponent;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageComposantRepository;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetComposantByOuvrageAdapter implements LoadComposantByOuvrage {

    /* just for now*/

    private final OuvrageComposantRepository ouvrageComposantRepository;
    @Override
    public List<OuvrageComponent> loadComposantByOuvrage(String code){
        return ouvrageComposantRepository.findAll();
    }
}

