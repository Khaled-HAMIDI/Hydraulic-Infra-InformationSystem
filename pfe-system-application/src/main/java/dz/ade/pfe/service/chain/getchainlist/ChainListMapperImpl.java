package dz.ade.pfe.service.chain.getchainlist;

import dz.ade.pfe.domain.ouvrage.Chain;
import org.springframework.stereotype.Component;

import javax.annotation.Generated;
import java.util.ArrayList;
import java.util.List;

@Generated(
        value = "org.mapstruct.ap.MappingProcessor",
        date = "2020-04-16T12:13:32+0100",
        comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_92 (Oracle Corporation)"
)
@Component
public class ChainListMapperImpl implements ChainListMapper {

    @Override
    public ChainListDto chainToChainListDto(Chain chain) {
        if ( chain == null ) {
            return null;
        }

        ChainListDto chainListDto = new ChainListDto();

        chainListDto.setId( chain.getId().toString() );
        chainListDto.setCode(chain.getCode());
        chainListDto.setName( chain.getName() );
        chainListDto.setOuvragesNumber(chain.getOuvrages().size());
        return chainListDto;
    }

    @Override
    public List<ChainListDto> chainToChainListDto(List<Chain> chain) {
        if ( chain == null ) {
            return null;
        }

        List<ChainListDto> list = new ArrayList<ChainListDto>( chain.size() );
        for ( Chain chain1 : chain ) {
            list.add( chainToChainListDto( chain1 ) );
        }

        return list;
    }
}
