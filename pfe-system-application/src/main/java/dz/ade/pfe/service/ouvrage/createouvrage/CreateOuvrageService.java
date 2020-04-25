package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import dz.ade.pfe.service.ouvrage.OuvrageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageQuery {
    //@Autowired
    private final SaveOuvrage saveOuvrage;
    private final OuvrageMapper ouvrageMapper;

    @Override
    public Ouvrage createOuvrage(OuvrageAddDto ouvrageAddDto){

        Ouvrage ouvrage =ouvrageMapper.ouvrageAddToOuvrage(ouvrageAddDto);

        return saveOuvrage.saveOuvrage(ouvrage);
    }
}

