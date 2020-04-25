package dz.ade.pfe.service.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.Component;
import dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage.GetComposantByOuvrageQuery;
import dz.ade.pfe.port.out.ouvrage.getcomposantbyouvrage.LoadComposantByOuvrage;
import dz.ade.pfe.service.ouvrage.ComposantMapper;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.ComponentResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetComposantByOuvrage implements GetComposantByOuvrageQuery{

    private final LoadComposantByOuvrage loadComposantByOuvrage;
    private final ComposantMapper composantMapper;

    @Override
    public List<ComponentResponseDto> getComposantByOuvrage(String code) {
        return composantMapper.componentToComponentResponse(loadComposantByOuvrage.loadComposantByOuvrage(code));
    }
}
