package dz.ade.pfe.service.chain.createchain;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.port.in.chain.createchain.CreateChainQuery;
import dz.ade.pfe.port.out.createchain.SaveNewChain;
import dz.ade.pfe.port.out.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.savechainouvrage.SaveChainOuvrage;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import serilogj.Log;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateChainService implements CreateChainQuery {
    private final SaveNewChain saveNewChain;
    private final ChainSaveMapper chainSaveMapper;
    private final LoadOuvragesByCodes loadOuvragesByCodes;
    private final SaveChainOuvrage saveChainOuvrage;
    //@Transactional
    @Override
    public Chain createChain(ChainSaveDto chain) {
        Chain chain1 = chainSaveMapper.chainSaveToChain(chain);
        Chain chain2 = saveNewChain.saveChain(chain1);
        List<String> ouvragesCode = chain.getOuvragesCodes();
        if(ouvragesCode.size()>0)
        convertStringsToOuvrages(ouvragesCode).stream()
                .forEach((ouvrage) ->{
                    saveChainOuvrage.saveChainOuvrage(new OuvrageChain(null,chain2,ouvrage,ouvragesCode.indexOf(ouvrage.getCode())));
                } );
        return chain2;

    }

    private List<Ouvrage> convertStringsToOuvrages(List<String> ouvrages){
        return loadOuvragesByCodes.loadOuvragesByCodes(ouvrages);
    }
}
