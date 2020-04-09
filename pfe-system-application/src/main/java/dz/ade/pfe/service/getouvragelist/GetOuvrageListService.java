package dz.ade.pfe.service.getouvragelist;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.getouvragelist.GetOuvrageListQuery;
import dz.ade.pfe.port.out.getouvragelist.LoadOuvrageList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetOuvrageListService implements GetOuvrageListQuery {

    private final LoadOuvrageList loadOuvrageList;
    private final OuvrageListMapper ouvrageListMapper;


    @Override
    public List<OuvrageListDto> getOuvrageList() {
        List<Ouvrage> ouvrages = loadOuvrageList.loadOuvrageList();
        return  ouvrageListMapper.ouvrageToOuvrageListDto(ouvrages);
    }
}
