package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.port.in.chain.getchaindetails.GetChainDetailsQuery;
import dz.ade.pfe.port.out.chain.getchaindetails.LoadChainDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetChainDetailsService implements GetChainDetailsQuery {
    private final LoadChainDetails loadChainDetails;
    private final ChainDetailsMapper chainDetailsMapper;


    @Override
    public ChainDto getChainDetails(String code) {
        Optional<Chain> ch = loadChainDetails.loadChainDetails(code);
        if (!ch.isPresent()) {
            throw new ResourceNotFoundException(String.format("No chain found with code '%s'.", code));
        }
        Chain chain = ch.get();
        return  chainDetailsMapper.chainToChainDto(chain);
    }
}