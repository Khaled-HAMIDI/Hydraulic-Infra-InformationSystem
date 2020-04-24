package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.Component;
import dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage.GetComposantByOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetComposantByOuvrage implements GetComposantByOuvrageQuery{

    private final LoadComposantByOuvrage loadComposantByOuvrage;

    @Override
    public List<Component> getComposantByOuvrage(String code) {
        return loadComposantByOuvrage.loadComposantByOuvrage(code);
    }
}
