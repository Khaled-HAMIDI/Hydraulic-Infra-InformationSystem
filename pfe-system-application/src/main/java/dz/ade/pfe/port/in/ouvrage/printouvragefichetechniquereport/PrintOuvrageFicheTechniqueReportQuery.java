package dz.ade.pfe.port.in.ouvrage.printouvragefichetechniquereport;

import dz.ade.pfe.service.ouvrage.printouvragefichetechniquereport.PrintOuvrageFicheTechniqueDto;
import org.springframework.core.io.Resource;

public interface PrintOuvrageFicheTechniqueReportQuery {

    Resource execute(PrintOuvrageFicheTechniqueDto printOuvrageFicheTechniqueDto);
}
