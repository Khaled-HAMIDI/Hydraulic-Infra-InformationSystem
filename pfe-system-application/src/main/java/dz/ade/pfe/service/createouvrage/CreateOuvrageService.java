package dz.ade.pfe.service.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.port.out.createouvrage.SaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageQuery {
    //@Autowired
    private final SaveOuvrage saveOuvrage;

    @Override
    public Ouvrage createOuvrage(Ouvrage ouvrage){

        return saveOuvrage.saveOuvrage(ouvrage);
    }
}

