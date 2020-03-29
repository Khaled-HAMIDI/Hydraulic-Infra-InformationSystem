package dz.ade.pfe.service.updateouvrage;


import dz.ade.pfe.port.in.updateouvrage.UpdateOuvrageQuery;
import dz.ade.pfe.port.out.updateouvrage.UpdateSaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateOuvrageService implements UpdateOuvrageQuery {
    //@Autowired
    private final UpdateSaveOuvrage updateSaveOuvrage;

    @Override
    public String updateOuvrage(OuvrageUpdateDto ouvrageUpdateDto,int id){

        return updateSaveOuvrage.updateSaveOuvrage(ouvrageUpdateDto,id);
    }
}
