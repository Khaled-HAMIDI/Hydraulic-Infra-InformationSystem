package dz.ade.pfe.ouvrage.inventory.chain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.port.out.DeleteChainOuvrage.DeleteChainOuvrage;
import dz.ade.pfe.port.out.createchain.SaveNewChain;
import dz.ade.pfe.port.out.getchainbycode.LoadChainByCode;
import dz.ade.pfe.port.out.getchaindetails.LoadChainDetails;
import dz.ade.pfe.port.out.getchainlist.LoadChainList;
import dz.ade.pfe.port.out.savechainouvrage.SaveChainOuvrage;
import dz.ade.pfe.port.out.updatechain.ModifyChain;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import serilogj.Log;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ChainPersistenceAdapter implements LoadChainList, LoadChainDetails, SaveNewChain, SaveChainOuvrage, ModifyChain, DeleteChainOuvrage, LoadChainByCode {

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
}