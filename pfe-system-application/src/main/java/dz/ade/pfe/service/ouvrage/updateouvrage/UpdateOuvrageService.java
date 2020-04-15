package dz.ade.pfe.service.ouvrage.updateouvrage;


import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.updateouvrage.UpdateOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.updateouvrage.UpdateSaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateOuvrageService implements UpdateOuvrageQuery {
    //@Autowired
    private final UpdateSaveOuvrage updateSaveOuvrage;

    @Override
    public Ouvrage updateOuvrage(OuvrageUpdateDto ouvrageUpdateDto, String code){

        return updateSaveOuvrage.updateSaveOuvrage(ouvrageUpdateDto,code);
    }

    @Override
    public Ouvrage getUpdatedOuvrage(String code){

        return updateSaveOuvrage.getUpdatedOuvrage(code);
    }


}
