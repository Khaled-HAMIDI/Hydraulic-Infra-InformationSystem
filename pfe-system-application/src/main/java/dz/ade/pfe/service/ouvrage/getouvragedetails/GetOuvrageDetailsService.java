package dz.ade.pfe.service.ouvrage.getouvragedetails;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import dz.ade.pfe.port.in.ouvrage.getouvragedetails.GetOuvrageDetailsQuery;
import dz.ade.pfe.port.out.ouvrage.getouvragedetails.LoadOuvrageDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetOuvrageDetailsService implements GetOuvrageDetailsQuery {
    //@Autowired
    private final LoadOuvrageDetails loadOuvrageDetails;
    private final GetOuvrageDetailsMapper getOuvrageDetailsMapper;

    @Override
    public OuvrageDto getOuvrageDetails(String code){

        Ouvrage ouvrage = loadOuvrageDetails.loadOuvrageDetails(code);
        return  getOuvrageDetailsMapper.ouvrageToOuvrageDto(ouvrage);
    }
}
