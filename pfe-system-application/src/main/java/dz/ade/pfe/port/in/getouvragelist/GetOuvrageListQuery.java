package dz.ade.pfe.port.in.getouvragelist;


import dz.ade.pfe.service.getouvragelist.OuvrageListDto;

import java.util.List;

public interface GetOuvrageListQuery {
    List<OuvrageListDto> getOuvrageList();
}
