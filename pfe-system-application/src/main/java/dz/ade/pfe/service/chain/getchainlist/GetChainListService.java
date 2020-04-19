package dz.ade.pfe.service.chain.getchainlist;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.port.in.chain.getchainlist.GetChainListQuery;
import dz.ade.pfe.port.out.chain.getchainlist.LoadChainList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetChainListService implements GetChainListQuery{
    private final LoadChainList loadChainList;
    private final ChainListMapper chainListMapper;


    @Override
    public List<ChainListDto> getChainList() {
        List<Chain> chains = loadChainList.loadChainList();
        return  chainListMapper.chainToChainListDto(chains);
    }
}
