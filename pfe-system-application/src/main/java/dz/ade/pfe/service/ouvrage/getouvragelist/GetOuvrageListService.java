package dz.ade.pfe.service.ouvrage.getouvragelist;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.getouvragelist.GetOuvrageListQuery;
import dz.ade.pfe.port.out.ouvrage.getouvragelist.LoadOuvrageList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetOuvrageListService implements GetOuvrageListQuery {

    private final LoadOuvrageList loadOuvrageList;
    private final GetOuvrageListMapper getOuvrageListMapper;


    @Override
    public List<OuvrageListDto> getOuvrageList(String codeStructure) {
        List<Ouvrage> ouvrages = loadOuvrageList.loadOuvrageList(codeStructure);
        return  getOuvrageListMapper.ouvrageToOuvrageListDto(ouvrages);
    }
}
