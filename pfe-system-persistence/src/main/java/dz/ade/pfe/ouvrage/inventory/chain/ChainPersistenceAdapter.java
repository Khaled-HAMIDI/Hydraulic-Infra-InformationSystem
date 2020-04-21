package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.port.out.chain.DeleteChainOuvrage.DeleteChainOuvrage;
import dz.ade.pfe.port.out.chain.getchainbycode.LoadChainByCode;
import dz.ade.pfe.port.out.chain.getchainsynoptic.LoadChainSynoptic;
import dz.ade.pfe.port.out.chain.savechainouvrage.SaveChainOuvrage;
import dz.ade.pfe.port.out.chain.updatechain.ModifyChain;
import dz.ade.pfe.port.out.chain.createchain.SaveNewChain;
import dz.ade.pfe.port.out.chain.getchaindetails.LoadChainDetails;
import dz.ade.pfe.port.out.chain.getchainlist.LoadChainList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ChainPersistenceAdapter implements LoadChainList, LoadChainDetails, SaveNewChain, SaveChainOuvrage, ModifyChain, DeleteChainOuvrage, LoadChainByCode, LoadChainSynoptic {

    private final ChainRepository chainRepository;
    private final OuvrageChainRepository ouvrageChainRepository;

    @Override
    public List<Chain> loadChainList() {
        return chainRepository.findAll();
    }

    @Override
    public Optional<Chain> loadChainDetails(String code) {
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

    @Override
    public Chain modifyChain(Chain chain) {
        return  chainRepository.save(chain);
    }

    @Transactional
    @Override
    public void deleteChainOuvrage(List<Long> ids) {
        ouvrageChainRepository.deleteByIdIn(ids);
    }

    @Override
    public Optional<Chain> getChainByCode(String code) {
        return chainRepository.findByCode(code);
    }

    @Override
    public List<Chain> loadChainSynoptic() {
        return chainRepository.findAll();
    }
}