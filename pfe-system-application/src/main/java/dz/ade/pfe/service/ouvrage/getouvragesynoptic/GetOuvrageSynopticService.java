package dz.ade.pfe.service.ouvrage.getouvragesynoptic;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.getouvragesynoptic.GetOuvrageSynopticQuery;
import dz.ade.pfe.port.out.ouvrage.getouvragesynoptic.LoadOuvrageSynoptic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetOuvrageSynopticService implements GetOuvrageSynopticQuery {
    private final LoadOuvrageSynoptic loadOuvrageSynoptic;
    private final OuvrageSynopticMapper ouvrageSynopticMapper;

    @Override
    public List<OuvrageSynopticDto> getOuvrageSynoptic(String code) {
        List<Ouvrage> ouvrages = loadOuvrageSynoptic.loadOuvrageSynoptic(code);
        return ouvrageSynopticMapper.ouvrageToOuvrageDto(ouvrages);
    }
}
