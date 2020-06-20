package dz.ade.pfe.service.dashboard;

import dz.ade.pfe.port.in.ouvrage.getnbouvrages.GetNbOuvrages;
import dz.ade.pfe.port.out.ouvrage.loadnbouvrages.LoadNbOuvrages;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetNbOuvragesService implements GetNbOuvrages {
    private final LoadNbOuvrages loadNbOuvrages;

    @Override
    public List<Object> getNbOuvrages(){
        return loadNbOuvrages.loadNbOuvrages();
    }
}
