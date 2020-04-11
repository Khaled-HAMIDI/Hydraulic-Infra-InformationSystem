package dz.ade.pfe.port.in.chain.getchainlist;

import dz.ade.pfe.service.chain.getchainlist.ChainListDto;
import java.util.List;

public interface GetChainListQuery {
    List<ChainListDto> getChainList();
}
