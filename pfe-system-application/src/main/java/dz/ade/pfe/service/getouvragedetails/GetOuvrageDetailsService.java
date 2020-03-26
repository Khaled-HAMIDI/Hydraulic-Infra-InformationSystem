package dz.ade.pfe.service.getouvragedetails;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.getouvragedetails.GetOuvrageDetailsQuery;
import dz.ade.pfe.port.out.getouvragedetails.LoadOuvrageDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetOuvrageDetailsService implements GetOuvrageDetailsQuery {
    //@Autowired
    private final LoadOuvrageDetails loadOuvrageDetails;
    private final OuvrageMapper ouvrageMapper;

    @Override
    public OuvrageDto getOuvrageDetails(String code){

        Ouvrage ouvrage = loadOuvrageDetails.loadOuvrageDetails(code);
        return  ouvrageMapper.ouvrageToOuvrageDto(ouvrage);
    }
}
