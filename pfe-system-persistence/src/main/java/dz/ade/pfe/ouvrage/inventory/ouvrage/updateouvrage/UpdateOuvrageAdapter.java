package dz.ade.pfe.ouvrage.inventory.ouvrage.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.updateouvrage.UpdateSaveOuvrage;
import dz.ade.pfe.service.updateouvrage.OuvrageUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UpdateOuvrageAdapter implements UpdateSaveOuvrage {

    private final OuvrageRepository ouvrageRepository;
    @Override
    public String updateSaveOuvrage(OuvrageUpdateDto ouvrageUpdateDto,int id) {
        Ouvrage existingOuvrage=ouvrageRepository.getOne((long) 1);

        existingOuvrage.setCurrentCapacity(ouvrageUpdateDto.getCurrentCapacity());
        existingOuvrage.setState(ouvrageUpdateDto.getState());
        existingOuvrage.setPopulationServed(ouvrageUpdateDto.getPopulationServed());
        existingOuvrage.setPower(ouvrageUpdateDto.getPower());
        existingOuvrage.setPumpDebit(ouvrageUpdateDto.getPumpDebit());

        ouvrageRepository.save(existingOuvrage);
        return "Ouvrage was Succesfully Updated";
    }
}