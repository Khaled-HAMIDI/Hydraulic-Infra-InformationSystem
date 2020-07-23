package dz.ade.pfe.port.in.ouvrage.printouvragerecap;

import dz.ade.pfe.service.ouvrage.printouvragerecap.OuvrageRecapDto;
import org.springframework.core.io.Resource;

public interface OuvrageRecapQuery {
    Resource execut(OuvrageRecapDto ouvrageRecapDto);
}
