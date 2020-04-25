package dz.ade.pfe.service.ouvrage.getouvrage;

import dz.ade.pfe.port.in.ouvrage.getouvrage.GetOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.getouvrage.LoadOuvrage;
import dz.ade.pfe.service.ouvrage.OuvrageMapper;
import dz.ade.pfe.service.ouvrage.createouvrage.OuvrageShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetOuvrageService implements GetOuvrageQuery {

    private final LoadOuvrage loadOuvrage;
    private final OuvrageMapper ouvrageMapper;

    @Override
    public OuvrageShowDto getOuvrage(String code) {

        return ouvrageMapper.ouvrageToOuvrageShow(loadOuvrage.getOuvrage(code));

    }
}
