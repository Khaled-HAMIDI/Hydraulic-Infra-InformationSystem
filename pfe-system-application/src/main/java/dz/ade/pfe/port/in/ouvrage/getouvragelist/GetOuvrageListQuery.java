package dz.ade.pfe.port.in.ouvrage.getouvragelist;


import dz.ade.pfe.service.ouvrage.getouvragelist.DeclassedDto;
import dz.ade.pfe.service.ouvrage.getouvragelist.OuvrageListDto;

import java.util.List;

public interface GetOuvrageListQuery {
    List<OuvrageListDto> getOuvrageList(String codeStructure);
    List<DeclassedDto> getOuvrageDeclassed(String codeStructure);
}
