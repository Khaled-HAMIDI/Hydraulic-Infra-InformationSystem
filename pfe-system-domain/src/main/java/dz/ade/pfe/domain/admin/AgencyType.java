package dz.ade.pfe.domain.admin;

import java.util.stream.Stream;

/**
 * @author kabouche
 * @version 1.0
 * @created 7/22/2018
 */
public enum AgencyType {
    AGENCY("Agence"), SECTOR("Secteur"), ECHELON("Echelon");

    private String value;

    AgencyType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static AgencyType of(String value) {
        return Stream.of(AgencyType.values())
                .filter(p -> p.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
