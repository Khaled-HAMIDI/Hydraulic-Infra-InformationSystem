package dz.ade.pfe.service.ouvrage.getouvrage;

import dz.ade.pfe.port.in.ouvrage.getouvrage.GetOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.getouvrage.LoadOuvrage;
import dz.ade.pfe.service.ouvrage.getouvrage.OuvrageShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetOuvrageService implements GetOuvrageQuery {

    private final LoadOuvrage loadOuvrage;
    private final GetOuvrageMapper getOuvrageMapper;

    @Override
    public OuvrageShowDto getOuvrage(String code) {

        return getOuvrageMapper.ouvrageToOuvrageShow(loadOuvrage.getOuvrage(code));

    }
}
