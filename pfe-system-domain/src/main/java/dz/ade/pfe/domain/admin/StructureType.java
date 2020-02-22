package dz.ade.pfe.domain.admin;

import java.util.stream.Stream;

/**
 * @author kabouche
 * @version 1.0
 * @created 25-avr.-2018 11:14:46
 */
public enum StructureType {
    UNIT("Unité"),
    CENTER("Centre"),
    AGENCY("Agence");

    private String value;

    StructureType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static StructureType of(String value) {
        return Stream.of(StructureType.values())
                .filter(p -> p.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
