package dz.ade.pfe.ouvrage.inventory.ouvrage.updateouvrage;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.ouvrage.inventory.ouvrage.OuvrageRepository;
import dz.ade.pfe.port.out.updateouvrage.UpdateSaveOuvrage;
import dz.ade.pfe.service.createouvrage.OuvrageAddDto;
import dz.ade.pfe.service.updateouvrage.OuvrageUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UpdateOuvrageAdapter implements UpdateSaveOuvrage {

    private final OuvrageRepository ouvrageRepository;

    @Override
    public Ouvrage updateSaveOuvrage(OuvrageUpdateDto ouvrageUpdateDto, String code) {
        Ouvrage existingOuvrage=ouvrageRepository.findByCode(code);

        existingOuvrage.setEnabled(ouvrageUpdateDto.getEnabled());
        existingOuvrage.setCurrentCapacity(ouvrageUpdateDto.getCurrentCapacity());
        existingOuvrage.setState(ouvrageUpdateDto.getState());
        existingOuvrage.setPower(ouvrageUpdateDto.getPower());
        existingOuvrage.setPumpDebit(ouvrageUpdateDto.getPumpDebit());
        existingOuvrage.setTotalWorkforce(ouvrageUpdateDto.getTotalWorkforce());
        existingOuvrage.setEnergyMonthlyBill(ouvrageUpdateDto.getEnergyMonthlyBill());
        existingOuvrage.setSpecializedLine(ouvrageUpdateDto.getSpecializedLine());
        existingOuvrage.setRemoteManagement(ouvrageUpdateDto.getRemoteManagement());
        existingOuvrage.setAbri(ouvrageUpdateDto.getAbri());

        existingOuvrage.setChemicalMonthlyBill(ouvrageUpdateDto.getChemicalMonthlyBill());
        existingOuvrage.setCoteTn(ouvrageUpdateDto.getCoteTn());
        existingOuvrage.setDebitLoadBreaker(ouvrageUpdateDto.getDebitLoadBreaker());
        existingOuvrage.setChargesAmontEtAval(ouvrageUpdateDto.getChargesAmontEtAval());
        existingOuvrage.setCurrentDebit(ouvrageUpdateDto.getCurrentDebit());
        existingOuvrage.setElectricAlimentation(ouvrageUpdateDto.getElectricAlimentation());

        ouvrageRepository.save(existingOuvrage);
        return existingOuvrage;
    }


    @Override
    public Ouvrage getUpdatedOuvrage(String code) {

        return ouvrageRepository.findByCode(code);
    }
}