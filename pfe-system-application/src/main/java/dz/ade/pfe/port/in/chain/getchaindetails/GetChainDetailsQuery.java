package dz.ade.pfe.port.in.chain.getchaindetails;


import dz.ade.pfe.service.chain.getchaindetails.ChainDto;

public interface GetChainDetailsQuery {
    ChainDto getChainDetails(String code);
}
