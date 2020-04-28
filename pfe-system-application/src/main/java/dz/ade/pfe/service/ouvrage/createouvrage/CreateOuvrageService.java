package dz.ade.pfe.service.ouvrage.createouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.createouvrage.CreateOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateOuvrageService implements CreateOuvrageQuery {
    //@Autowired
    private final SaveOuvrage saveOuvrage;
    private final CreateOuvrageMapper createOuvrageMapper;

    @Override
    public Ouvrage createOuvrage(OuvrageAddDto ouvrageAddDto){

        Ouvrage ouvrage =createOuvrageMapper.ouvrageAddToOuvrage(ouvrageAddDto);

        return saveOuvrage.saveOuvrage(ouvrage);
    }
}

