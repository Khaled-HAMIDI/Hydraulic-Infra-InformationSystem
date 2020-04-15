package dz.ade.pfe.service.chain.createchain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.port.in.chain.createchain.CreateChainQuery;
import dz.ade.pfe.port.out.chain.createchain.SaveNewChain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateChainService implements CreateChainQuery {
    private final SaveNewChain saveNewChain;
    private final ChainSaveMapper chainSaveMapper;

    @Override
    public Chain createChain(ChainSaveDto chain) {
        return saveNewChain.saveChain(chainSaveMapper.chainSaveToChain(chain));
    }
}
