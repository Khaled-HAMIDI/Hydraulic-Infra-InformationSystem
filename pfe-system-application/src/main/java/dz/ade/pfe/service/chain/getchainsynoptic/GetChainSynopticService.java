package dz.ade.pfe.service.chain.getchainsynoptic;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.port.in.chain.getchainsynoptic.GetChainSynopticQuery;
import dz.ade.pfe.port.out.chain.getchainsynoptic.LoadChainSynoptic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetChainSynopticService implements GetChainSynopticQuery {
    private final LoadChainSynoptic loadChainSynoptic;
    private final ChainSynopticMapper chainSynopticMapper;
    @Override
    public List<ChainSynopticDto> getChainSynoptic(String code) {
        List<Chain> chains = loadChainSynoptic.loadChainSynoptic(code);
        return chainSynopticMapper.chainToChainListDto(chains);
    }
}
