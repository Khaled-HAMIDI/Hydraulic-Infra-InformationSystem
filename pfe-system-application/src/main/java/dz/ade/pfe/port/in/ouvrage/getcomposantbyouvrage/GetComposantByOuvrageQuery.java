package dz.ade.pfe.port.in.ouvrage.getcomposantbyouvrage;

import dz.ade.pfe.domain.ouvrage.Component;
import dz.ade.pfe.service.ouvrage.createcomposant.Dtos.ComponentResponseDto;

import java.util.List;

public interface GetComposantByOuvrageQuery {
    List<ComponentResponseDto> getComposantByOuvrage(String code);
}

