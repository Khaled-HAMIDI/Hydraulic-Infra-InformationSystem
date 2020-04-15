package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.port.in.chain.getchaindetails.GetChainDetailsQuery;
import dz.ade.pfe.port.out.chain.getchaindetails.LoadChainDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetChainDetailsService implements GetChainDetailsQuery {
    private final LoadChainDetails loadChainDetails;
    private final ChainDetailsMapper chainDetailsMapper;


    @Override
    public ChainDto getChainDetails(String code) {
        Chain chains = loadChainDetails.loadChainDetails(code);
        return  chainDetailsMapper.chainToChainDto(chains);
    }
}