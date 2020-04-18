package dz.ade.pfe.service.chain.getchaindetails;

import dz.ade.pfe.domain.ouvrage.Chain;
import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.domain.ouvrage.OuvrageChain;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.Generated;

import dz.ade.pfe.service.chain.getchainlist.ChainListDto;
import org.springframework.stereotype.Component;

@Generated(
        value = "org.mapstruct.ap.MappingProcessor",
        date = "2020-04-16T11:16:29+0100",
        comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_92 (Oracle Corporation)"
)
@Component
public class ChainChainDtoMapperImp implements ChainDetailsMapper {

    @Override
    public ChainDto chainToChainDto(Chain chain) {
        if ( chain == null ) {
            return null;
        }

        ChainDto chainDto = new ChainDto();

        chainDto.setId( chain.getId().toString() );
        chainDto.setCode(chain.getCode());
        chainDto.setName( chain.getName() );

        List<OuvrageDto> list = new ArrayList<OuvrageDto>( chain.getOuvrages().size() );
        for ( OuvrageChain ouvrage : chain.getOuvrages() ) {
            list.add( ouvrageToOuvrageDto( ouvrage ) );
        }

        if ( list != null ) {
            chainDto.setOuvrages( list );
        }
        chainDto.setOuvragesNumber(list.size());

        return chainDto;
    }
    private OuvrageDto ouvrageToOuvrageDto(OuvrageChain chain){
        if ( chain == null ) {
            return null;
        }
        OuvrageDto ouvrageDto = new OuvrageDto();
        ouvrageDto.setCode(chain.getOuvrage().getCode());
        ouvrageDto.setPosition(chain.getPosition());

        return ouvrageDto;
    }
}