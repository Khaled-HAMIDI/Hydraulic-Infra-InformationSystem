package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.port.out.createchain.SaveNewChain;
import dz.ade.pfe.port.out.getchaindetails.LoadChainDetails;
import dz.ade.pfe.port.out.getchainlist.LoadChainList;
import dz.ade.pfe.port.out.savechainouvrage.SaveChainOuvrage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ChainPersistenceAdapter implements LoadChainList, LoadChainDetails, SaveNewChain, SaveChainOuvrage {

    private final ChainRepository chainRepository;
    private final OuvrageChainRepository ouvrageChainRepository;

    @Override
    public List<Chain> loadChainList() {
        return chainRepository.findAll();
    }

    @Override
    public Chain loadChainDetails(String code) {
        return chainRepository.findByCode(code);
    }

    @Override
    public Chain saveChain(Chain chain) {
        return chainRepository.save(chain);
    }

    @Override
    public OuvrageChain saveChainOuvrage(OuvrageChain ouvragechain) {
        return ouvrageChainRepository.save(ouvragechain);
    }
}