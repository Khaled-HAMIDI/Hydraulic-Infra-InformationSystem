package dz.ade.pfe.ouvrage.inventory.ouvrage.createouvrage;

import dz.ade.pfe.domain.exceptions.ResourceAlreadyExistException;
import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.ouvrage.createouvrage.SaveOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CreateOuvrageAdapter implements SaveOuvrage {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public Ouvrage saveOuvrage(Ouvrage ouvrage){

        if (ouvrageRepository.existsByCode(ouvrage.getCode()))
            throw new ResourceAlreadyExistException("codeExist");

         ouvrageRepository.save(ouvrage);

        return ouvrage;
    }
}
