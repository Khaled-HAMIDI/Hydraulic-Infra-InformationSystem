package dz.ade.pfe.port.in.ouvrage.getouvragesynoptic;

import dz.ade.pfe.service.ouvrage.getouvragesynoptic.OuvrageSynopticDto;

import java.util.List;

public interface GetOuvrageSynopticQuery {
    List<OuvrageSynopticDto> getOuvrageSynoptic();
}
