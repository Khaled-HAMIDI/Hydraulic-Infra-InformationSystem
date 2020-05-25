package dz.ade.pfe.service.chain.updatechain;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.port.in.chain.updatechain.UpdateChainQuery;
import dz.ade.pfe.port.out.chain.DeleteChainOuvrage.DeleteChainOuvrage;
import dz.ade.pfe.port.out.chain.getchaindetails.LoadChainDetails;
import dz.ade.pfe.port.out.ouvrage.getouvragesbycodes.LoadOuvragesByCodes;
import dz.ade.pfe.port.out.chain.updatechain.ModifyChain;
import dz.ade.pfe.service.chain.getchaindetails.ChainDetailsMapper;
import dz.ade.pfe.service.chain.getchaindetails.ChainDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UpdateChainService implements UpdateChainQuery {
    private final LoadChainDetails loadChainDetails;
    private final LoadOuvragesByCodes loadOuvragesByCodes;
    private final ModifyChain modifyChain;
    private final ChainDetailsMapper chainDetailsMapper;
    private final UpdateChainMapper updateChainMapper;
    private final DeleteChainOuvrage deleteChainOuvrage;

    @Override
    public ChainDto updateChain(UpdateChainDto chain, String code) {
        Optional<Chain> ch = loadChainDetails.loadChainDetails(code);
        if (!ch.isPresent()) {
            throw new ResourceNotFoundException(String.format("No chain found with code '%s'.", code));
        }
        Chain chain1 = ch.get();
        List<Long> ids = chain1.getOuvrages().stream()
                 .map(OuvrageChain::getId)
                .collect(Collectors.toList());
        chain1.setOuvrages(new ArrayList<>());
        deleteChainOuvrage.deleteChainOuvrage(ids);

        List<String> ouvragesCode = chain.getOuvrages();
        List<OuvrageChain> ouvrages = new ArrayList<OuvrageChain>(ouvragesCode.size());
        OuvrageChain ouv;
        if(ouvragesCode.size()>0)
        for(Ouvrage ouvrage : convertStringsToOuvrages(ouvragesCode)){
            ouv = new OuvrageChain(null,chain1,ouvrage,ouvragesCode.indexOf(ouvrage.getCode()));
            ouvrages.add(ouv);
        }
        chain1.setOuvrages(ouvrages);
        updateChainMapper.UpdateChainDtoToChain(chain , chain1);

        return chainDetailsMapper.chainToChainDto(modifyChain.modifyChain(chain1));
    }

    private List<Ouvrage> convertStringsToOuvrages(List<String> ouvrages){
        return loadOuvragesByCodes.loadOuvragesByCodes(ouvrages);
    }
}
