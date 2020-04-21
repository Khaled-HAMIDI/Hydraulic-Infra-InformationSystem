package dz.ade.pfe.service.chain.getchainsynoptic;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;
import dz.ade.pfe.service.ouvrage.getouvragesynoptic.OuvrageSynopticDto;
import org.springframework.stereotype.Component;

import javax.annotation.Generated;
import java.util.ArrayList;
import java.util.List;

@Generated(
        value = "org.mapstruct.ap.MappingProcessor",
        date = "2020-04-16T11:16:29+0100",
        comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_92 (Oracle Corporation)"
)
@Component
public class ChainSynopticMapperImp implements ChainSynopticMapper {
    @Override
    public ChainSynopticDto chainToChainDto(Chain chain) {
        if ( chain == null ) {
            return null;
        }
        ChainSynopticDto chainSynopticDto = new ChainSynopticDto();
        chainSynopticDto.setCode(chain.getCode());
        chainSynopticDto.setName( chain.getName() );

        List<OuvrageDto> list = new ArrayList<OuvrageDto>( chain.getOuvrages().size() );
        for ( OuvrageChain ouvrage : chain.getOuvrages() ) {
            list.add( ouvrageToOuvrageDto(ouvrage) );
        }

        if ( list != null ) {
            chainSynopticDto.setOuvrages( list );
        }

        return chainSynopticDto;
    }

    @Override
    public List<ChainSynopticDto> chainToChainListDto(List<Chain> chain) {
        if ( chain == null ) {
            return null;
        }

        List<ChainSynopticDto> list = new ArrayList<ChainSynopticDto>( chain.size() );
        for ( Chain chain1 : chain ) {
            list.add( chainToChainDto( chain1 ) );
        }

        return list;
    }

    private OuvrageDto ouvrageToOuvrageDto(OuvrageChain chain){
        if ( chain == null ) {
            return null;
        }
        OuvrageDto ouvrageDto = new OuvrageDto();
        ouvrageDto.setCode(chain.getOuvrage().getCode());
        ouvrageDto.setPosition(chain.getPosition());
        ouvrageDto.setName(chain.getOuvrage().getName());

        return ouvrageDto;
    }
}
