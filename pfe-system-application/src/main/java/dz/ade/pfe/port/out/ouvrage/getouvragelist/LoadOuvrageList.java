package dz.ade.pfe.port.out.ouvrage.getouvragelist;

import dz.ade.pfe.domain.ouvrage.Ouvrage;
import java.util.List;

public interface LoadOuvrageList {
    List<Ouvrage> loadOuvrageList(String codeStructure);
    List<Ouvrage> loadDeclassedList(String codeStructure);
}
