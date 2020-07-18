package dz.ade.pfe.service.ouvrage.deleteouvrage;

import dz.ade.pfe.port.in.ouvrage.deleteouvrage.DeleteOuvrageCommand;
import dz.ade.pfe.port.out.ouvrage.deleteouvrage.DeleteOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteOvrageService implements DeleteOuvrageCommand {
    private final DeleteOuvrage deleteOuvrage;
    @Override
    public Boolean deleteOuvrage(String code) {
        deleteOuvrage.deleteOuvrage(code);
        return true;
    }
}
